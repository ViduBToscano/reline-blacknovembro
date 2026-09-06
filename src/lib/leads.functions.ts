import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";

import type { Database } from "@/integrations/supabase/types";

const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  whatsapp: z
    .string()
    .trim()
    .min(8, "Informe um WhatsApp válido")
    .max(25)
    .regex(/^[0-9()+\-\s]+$/, "Informe um WhatsApp válido"),
  instagram: z.string().trim().max(60).optional().default(""),
});

const sessionConfig = {
  password: process.env["SESSION_SECRET"] ?? "dev-only-placeholder-session-secret-32chars",
  name: "reline-painel",
  maxAge: 60 * 60 * 12,
  cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
};

type PanelSession = { unlocked?: boolean };

function matches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await supabase.from("leads").insert({
      nome: data.nome,
      whatsapp: data.whatsapp,
      instagram: data.instagram || null,
    });

    if (error) {
      console.error("lead insert failed", error.message);
      return { ok: false as const };
    }
    return { ok: true as const };
  });

export const unlockPanel = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env["PANEL_PASSWORD"];
    if (!expected || !matches(data.password ?? "", expected)) {
      return { ok: false as const };
    }
    const session = await useSession<PanelSession>(sessionConfig);
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const lockPanel = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<PanelSession>(sessionConfig);
  await session.clear();
  return { ok: true as const };
});

export type Lead = {
  id: string;
  nome: string;
  whatsapp: string;
  instagram: string | null;
  created_at: string;
};

export const getLeads = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<PanelSession>(sessionConfig);
  if (!session.data.unlocked) {
    return { unlocked: false as const, leads: [] as Lead[] };
  }
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("id, nome, whatsapp, instagram, created_at")
    .order("created_at", { ascending: false })
    .limit(2000);

  if (error) {
    console.error("leads read failed", error.message);
    return { unlocked: true as const, leads: [] as Lead[] };
  }
  return { unlocked: true as const, leads: (data ?? []) as Lead[] };
});

const eventSchema = z.object({
  event: z.enum(["form_view", "form_submit_click", "popup_view", "community_click"]),
});

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const trackEvent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => eventSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await publicClient().from("page_events").insert({ event: data.event });
    if (error) console.error("event insert failed", error.message);
    return { ok: !error };
  });

export type EventStats = {
  form_view: number;
  form_submit_click: number;
  popup_view: number;
  community_click: number;
};

export const getEventStats = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<PanelSession>(sessionConfig);
  const empty: EventStats = {
    form_view: 0,
    form_submit_click: 0,
    popup_view: 0,
    community_click: 0,
  };
  if (!session.data.unlocked) return { unlocked: false as const, stats: empty };

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("page_events").select("event").limit(50000);
  if (error) {
    console.error("events read failed", error.message);
    return { unlocked: true as const, stats: empty };
  }
  const stats = { ...empty };
  for (const row of data ?? []) {
    const key = row.event as keyof EventStats;
    if (key in stats) stats[key] += 1;
  }
  return { unlocked: true as const, stats };
});
