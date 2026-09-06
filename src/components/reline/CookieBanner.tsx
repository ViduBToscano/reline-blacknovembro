import { useEffect, useState } from "react";

const KEY = "reline-lgpd-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(KEY, "accepted");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de privacidade e cookies"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
    >
      <div className="mx-auto flex max-w-[720px] flex-col gap-4 rounded-2xl border border-border bg-ink-2/95 p-5 shadow-2xl backdrop-blur-sm sm:flex-row sm:items-center">
        <p className="text-[0.82rem] leading-[1.6] text-foreground/80">
          <strong className="text-rose-lt">Privacidade (LGPD):</strong> usamos cookies e os dados
          informados nesta página apenas para oferecer acesso às condições da Black Novembro e
          melhorar sua experiência, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
        </p>
        <button
          type="button"
          onClick={accept}
          className="btn-cta shrink-0 px-6 py-3 text-[0.8rem]"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
