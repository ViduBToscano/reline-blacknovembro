import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";

import {
  getEventStats,
  getLeads,
  lockPanel,
  unlockPanel,
  type EventStats,
  type Lead,
} from "@/lib/leads.functions";

export const Route = createFileRoute("/painel")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Painel interno — Reline" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Painel,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function toCsv(leads: Lead[]) {
  const rows = [
    ["Data", "Nome", "WhatsApp", "E-mail"],
    ...leads.map((l) => [formatDate(l.created_at), l.nome, l.whatsapp, l.email ?? ""]),
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\n");
}

function Painel() {
  const fetchLeads = useServerFn(getLeads);
  const fetchStats = useServerFn(getEventStats);
  const unlock = useServerFn(unlockPanel);
  const lock = useServerFn(lockPanel);

  const [unlocked, setUnlocked] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<EventStats>({
    form_view: 0,
    form_submit_click: 0,
    popup_view: 0,
    community_click: 0,
    offer_click: 0,
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [res, ev] = await Promise.all([fetchLeads({}), fetchStats({})]);
    setUnlocked(res.unlocked);
    setLeads(res.leads);
    setStats(ev.stats);
    setLoading(false);
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    const res = await unlock({ data: { password } });
    if (!res.ok) {
      setError(true);
      return;
    }
    setPassword("");
    setLoading(true);
    await load();
  };

  const onExport = () => {
    const blob = new Blob([`\uFEFF${toCsv(leads)}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads-black-novembro.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Carregando…
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm rounded-3xl border border-border bg-ink-2/70 p-8"
        >
          <h1 className="mb-2 text-xl font-extrabold text-card-foreground">Painel interno</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Digite a senha de acesso para ver os cadastros.
          </p>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full rounded-xl border border-input bg-white/5 px-4 py-3 text-card-foreground outline-none focus:border-rose"
          />
          {error && <p className="mt-3 text-sm text-rose-lt">Senha incorreta.</p>}
          <button type="submit" className="btn-cta mt-5 w-full">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-5 py-12">
      <div className="container-page">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-card-foreground">Cadastros da Black</h1>
            <p className="text-sm text-muted-foreground">{leads.length} cadastro(s)</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onExport}
              className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-card-foreground hover:border-rose"
            >
              Exportar CSV
            </button>
            <button
              onClick={async () => {
                await lock({});
                setUnlocked(false);
                setLeads([]);
              }}
              className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-rose"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="mb-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              label: "Clicaram em ofertas",
              value: stats.offer_click,
              help: "Cliques nos botões de oferta da página (ex.: “Conferir ofertas”, “Quero entrar na comunidade”) que levam a pessoa até o formulário.",
            },
            {
              label: "Viram o formulário",
              value: stats.form_view,
              help: "Visitas em que o formulário “Quero entrar na Black November” apareceu na tela, seja rolando a página ou vindo de um botão.",
            },
            {
              label: "Clicaram em enviar",
              value: stats.form_submit_click,
              help: "Cliques no botão de enviar do formulário. Inclui tentativas com dados incompletos ou inválidos, por isso pode ser maior que o número de cadastros.",
            },
            {
              label: "Chegaram ao pop-up",
              value: stats.popup_view,
              help: "Cadastros concluídos com sucesso: o pop-up “Você está dentro!” foi exibido. Deve ficar próximo do total de cadastros abaixo.",
            },
            {
              label: "Clicaram na comunidade",
              value: stats.community_click,
              help: "Cliques no botão “Entrar na comunidade” dentro do pop-up, que leva ao grupo. É a etapa final do funil.",
            },
          ].map((card, i) => (
            <div key={card.label} className="rounded-2xl border border-border bg-ink-2/70 p-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-rose-lt/80">
                Etapa {i + 1}
              </p>
              <p className="mt-1 text-3xl font-extrabold text-card-foreground">{card.value}</p>
              <p className="mt-1 text-sm font-semibold text-card-foreground">{card.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{card.help}</p>
            </div>
          ))}
        </div>
        <p className="mb-8 text-xs leading-relaxed text-muted-foreground">
          Os números contam cliques e visualizações, não pessoas únicas: a mesma pessoa pode ser
          contada mais de uma vez se repetir a ação. A lista abaixo mostra apenas os cadastros
          enviados com sucesso.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-2/70 text-[0.7rem] uppercase tracking-[0.12em] text-rose-lt/80">
              <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">WhatsApp</th>
                <th className="px-4 py-3">E-mail</th>
              </tr>
            </thead>
            <tbody className="text-card-foreground">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                    Nenhum cadastro ainda.
                  </td>
                </tr>
              ) : (
                leads.map((l) => (
                  <tr key={l.id} className="border-t border-border">
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {formatDate(l.created_at)}
                    </td>
                    <td className="px-4 py-3">{l.nome}</td>
                    <td className="whitespace-nowrap px-4 py-3">{l.whatsapp}</td>
                    <td className="px-4 py-3">{l.email ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
