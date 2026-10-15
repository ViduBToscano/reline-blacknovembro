import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { initMetaPixel, revokeMetaConsent } from "@/lib/meta-pixel";

const KEY = "reline-lgpd-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
      else initMetaPixel();
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (value: string) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    if (value === "accepted") initMetaPixel();
    else revokeMetaConsent();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies e privacidade"
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-6 sm:pb-5"
    >
      <div className="mx-auto flex max-w-[980px] flex-col gap-4 rounded-[28px] bg-cream-lt p-5 text-ink shadow-2xl sm:rounded-full sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-4 sm:pl-7 sm:pr-4">
        <p className="text-[0.84rem] leading-[1.6] text-ink/75">
          Usamos cookies essenciais para o funcionamento do site e, com o seu aceite, cookies de
          medição e publicidade (Meta Pixel) para medir os resultados das nossas campanhas. Saiba
          mais na{" "}
          <Link
            to="/cookies"
            className="font-semibold text-ink underline underline-offset-2 hover:text-rose-dk"
          >
            Política de Cookies
          </Link>{" "}
          e na{" "}
          <Link
            to="/privacidade"
            className="font-semibold text-ink underline underline-offset-2 hover:text-rose-dk"
          >
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="rounded-full border border-ink/25 bg-transparent px-7 py-3 text-[0.78rem] font-bold uppercase tracking-wide text-ink transition-colors hover:bg-ink/5"
          >
            Rejeitar
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-full bg-ink px-7 py-3 text-[0.78rem] font-bold uppercase tracking-wide text-cream-lt transition-transform hover:-translate-y-0.5"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
