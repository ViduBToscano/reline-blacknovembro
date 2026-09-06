import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import heroAsset from "@/assets/reline-hero.jpg.asset.json";
import logoAsset from "@/assets/logo_reline.png.asset.json";
import portraitAsset from "@/assets/reline-portrait.jpg.asset.json";
import woman1Asset from "@/assets/woman-1.jpg.asset.json";
import woman2Asset from "@/assets/woman-2.jpg.asset.json";
import woman3Asset from "@/assets/woman-3.jpg.asset.json";
import { Reveal } from "@/components/reline/Reveal";
import { WhatsAppButton } from "@/components/reline/WhatsAppButton";
import { ChatPanel, ChatBubble, AvatarStack } from "@/components/reline/ChatPanel";
import CookieBanner from "@/components/reline/CookieBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Black Novembro Reline | Comunidade com acesso antecipado" },
      {
        name: "description",
        content:
          "A Black Novembro da Reline começa 04.11 com descontos progressivos. Entre na comunidade e saiba das condições antes de todo mundo.",
      },
      { property: "og:title", content: "Black Novembro Reline" },
      {
        property: "og:description",
        content:
          "Descontos progressivos em produtos Reline a partir de 04 de novembro. A comunidade sabe primeiro.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const LADDER = [
  { label: "1 produto", w: "30%" },
  { label: "2 produtos", w: "52%" },
  { label: "3 produtos", w: "76%" },
  { label: "Kit completo", w: "100%" },
];

const PERKS = [
  { n: "01", t: "Acesso antecipado à Black", d: "Saiba das condições antes de todo mundo." },
  {
    n: "02",
    t: "Descontos progressivos",
    d: "Quanto mais você aproveita a campanha, melhores podem ser as condições.",
  },
  {
    n: "03",
    t: "Surpresas especiais",
    d: "Benefícios exclusivos podem aparecer durante a campanha.",
  },
  {
    n: "04",
    t: "Avisos em primeira mão",
    d: "Fique sabendo quando uma condição começar — e quando estiver chegando ao fim.",
  },
];

const NEEDS = ["Nutrição", "Reconstrução", "Hidratação", "Finalização"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function targetDate() {
  const now = new Date();
  const y =
    now.getMonth() > 10 || (now.getMonth() === 10 && now.getDate() > 4)
      ? now.getFullYear() + 1
      : now.getFullYear();
  return new Date(y, 10, 4, 0, 0, 0);
}

function useCountdown() {
  const [t, setT] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const tick = () => {
      const ms = Math.max(0, targetDate().getTime() - Date.now());
      setT({
        days: Math.floor(ms / 86400000),
        hours: Math.floor(ms / 3600000) % 24,
        mins: Math.floor(ms / 60000) % 60,
        secs: Math.floor(ms / 1000) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return [
    { k: "dias", v: pad(t.days) },
    { k: "horas", v: pad(t.hours) },
    { k: "min", v: pad(t.mins) },
    { k: "seg", v: pad(t.secs) },
  ];
}

function Index() {
  const clock = useCountdown();
  const [nome, setNome] = useState("");
  const [zap, setZap] = useState("");
  const [insta, setInsta] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      {/* Top bar */}
      <div className="flex flex-wrap justify-center gap-3.5 border-b border-border bg-ink-2 px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[1.44px] text-rose-lt">
        <span>Black Novembro Reline</span>
        <span className="text-rose/55">•</span>
        <span>Começa 04.11</span>
        <span className="text-rose/55">•</span>
        <span className="text-rose-pale/75">Quem está na comunidade sabe primeiro</span>
      </div>

      {/* Hero */}
      <section
        className="relative flex min-h-[92vh] items-center bg-background bg-cover"
        style={{ backgroundImage: `url(${heroAsset.url})`, backgroundPosition: "72% center" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "var(--grad-hero-scrim)" }}
          aria-hidden="true"
        />
        <div className="grain" aria-hidden="true" />
        <div className="container-page relative py-20">
          <div className="max-w-[620px]">
            <img src={logoAsset.url} alt="Reline" className="mb-6 h-8 w-auto" />
            <h1 className="font-black-novembro text-metal m-0 text-[clamp(4rem,9.5vw,8.5rem)] leading-[0.86]">
              BLACK
            </h1>
            <p className="font-black-novembro mb-8 mt-1 text-[clamp(1.9rem,4.5vw,3.6rem)] uppercase leading-[1.05] text-rose-pale">
              novembro
            </p>
            <h2 className="mb-4 text-pretty text-[clamp(1.25rem,2.1vw,1.75rem)] font-bold leading-[1.25] text-card-foreground">
              A Black mais esperada do ano está chegando. E quem estiver na comunidade vai saber
              primeiro.
            </h2>
            <p className="mb-9 max-w-[56ch] text-pretty text-[1.05rem] leading-[1.75] text-foreground/80">
              A partir de <strong className="font-extrabold text-rose-lt">04 de novembro</strong>, a
              Reline preparou uma Black especial com descontos progressivos para você cuidar dos
              seus cabelos e aproveitar condições que não estarão disponíveis o ano todo.
            </p>

            <div className="mb-9 flex flex-wrap items-stretch gap-2.5">
              <div className="mr-1.5 flex flex-none flex-col justify-center border-r border-border py-3.5 pr-6">
                <span className="eyebrow text-[0.62rem] text-rose">Começa em</span>
                <strong className="text-[1.9rem] font-extrabold leading-none tracking-[-0.02em] text-rose-pale">
                  04.11
                </strong>
              </div>
              {clock.map((unit) => (
                <div
                  key={unit.k}
                  className="min-w-[76px] rounded-xl border border-border bg-ink-2/60 px-2 py-3 text-center"
                >
                  <strong className="block text-[1.75rem] font-extrabold leading-[1.1] tabular-nums text-card-foreground">
                    {unit.v}
                  </strong>
                  <span className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-rose-lt/75">
                    {unit.k}
                  </span>
                </div>
              ))}
            </div>

            <WhatsAppButton href="#cadastro" size="lg">
              Quero entrar na comunidade
            </WhatsAppButton>
            <p className="mt-4 text-[0.78rem] text-muted-foreground">
              *Participação limitada à comunidade. Sem custo para entrar.
            </p>
          </div>
        </div>
      </section>

      {/* Campanha */}
      <section
        className="relative overflow-hidden px-5 py-20"
        style={{ background: "var(--grad-panel-a)" }}
      >
        <div className="grain" aria-hidden="true" />
        <div
          className="absolute -right-[20vw] -top-[20vw] h-[50vw] w-[50vw]"
          style={{ background: "var(--glow-rose)" }}
          aria-hidden="true"
        />
        <div className="container-page relative grid items-center gap-20 [grid-template-columns:repeat(auto-fit,minmax(340px,1fr))]">
          <Reveal>
            <span className="eyebrow mb-4 text-rose">A campanha</span>
            <h2 className="mb-6 text-pretty text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.2] text-card-foreground">
              Novembro vai ser diferente. Quanto mais você aproveita, maior pode ser o seu desconto.
            </h2>
            <p className="mb-5 max-w-[60ch] text-pretty text-[1.05rem] leading-[1.75] text-foreground/80">
              Durante a <span className="font-black-novembro">Black Novembro</span>, você poderá encontrar{" "}
              <strong className="font-extrabold text-rose-lt">descontos progressivos</strong> em
              produtos selecionados da Reline.
            </p>
            <p className="mb-8 max-w-[60ch] text-pretty leading-[1.75] text-foreground/70">
              Uma oportunidade para montar seu cronograma, repor seus produtos favoritos ou
              finalmente experimentar aquele tratamento que está na sua lista.
            </p>
            <div className="rounded-r-xl border border-l-[3px] border-border border-l-rose bg-rose/10 px-6 py-5">
              <span className="eyebrow mb-2 text-[0.68rem] font-extrabold tracking-[0.16em] text-rose">
                Mas atenção
              </span>
              <p className="leading-[1.65] text-card-foreground">
                As condições serão reveladas{" "}
                <strong className="font-extrabold text-rose-pale">primeiro</strong> para quem
                estiver na comunidade.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-3.5">
              {LADDER.map((step) => (
                <div key={step.label} className="flex items-center gap-4">
                  <span className="w-[92px] flex-shrink-0 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-rose-lt/70">
                    {step.label}
                  </span>
                  <div className="relative h-[46px] flex-1 overflow-hidden rounded-full border border-border bg-white/5">
                    <div
                      className="flex h-full items-center justify-end rounded-full px-4"
                      style={{ background: "var(--grad-bar)", width: step.w }}
                    >
                      <span className="font-extrabold text-ink/60">?</span>
                    </div>
                  </div>
                </div>
              ))}
              <p className="mt-2 text-[0.8rem] tracking-[0.04em] text-muted-foreground">
                Percentuais revelados na comunidade a partir de 04.11.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Comunidade VIP */}
      <section className="relative overflow-hidden bg-cream px-5 py-20">
        <div
          className="absolute -bottom-[25vw] -left-[20vw] h-[55vw] w-[55vw]"
          style={{ background: "var(--glow-rose)" }}
          aria-hidden="true"
        />
        <div className="container-page relative">
          <Reveal className="mx-auto mb-14 max-w-[780px] text-center">
            <span className="eyebrow mb-4 text-cocoa">Comunidade VIP</span>
            <h2 className="mb-5 text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.2] text-graphite">
              Por que entrar na comunidade?
            </h2>
            <p className="text-pretty text-[1.05rem] leading-[1.75] text-slate-body">
              Não é apenas mais um grupo de ofertas. É o lugar onde você vai receber:
            </p>
          </Reveal>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {PERKS.map((perk, i) => (
              <Reveal key={perk.n} delay={i * 90}>
                <div className="h-full rounded-3xl bg-white px-7 py-9 shadow-[var(--shadow-soft)]">
                  <span
                    className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full text-[0.95rem] font-extrabold text-cream-lt"
                    style={{ background: "var(--grad-step-circle)" }}
                  >
                    {perk.n}
                  </span>
                  <h3 className="mb-2 text-[1.12rem] font-bold leading-[1.25] text-graphite">
                    {perk.t}
                  </h3>
                  <p className="text-pretty text-[0.95rem] leading-[1.7] text-slate-body">
                    {perk.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Começa 04.11 + chat */}
      <section
        className="relative overflow-hidden px-5 py-20"
        style={{ background: "var(--grad-panel-b)" }}
      >
        <div className="grain" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-20 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          <Reveal>
            <span className="eyebrow mb-4 text-rose">04.11</span>
            <h2 className="mb-6 text-pretty text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.2] text-card-foreground">
              Começa dia 04 de novembro.
            </h2>
            <p className="mb-1 text-[1.15rem] leading-[1.6] text-muted-foreground">
              Você pode esperar a Black começar…
            </p>
            <p className="mb-8 text-[1.35rem] font-extrabold leading-[1.4] text-rose-pale">
              ou chegar antes de todo mundo.
            </p>
            <p className="mb-9 max-w-[52ch] leading-[1.75] text-foreground/80">
              Entre para a comunidade e fique por dentro de todas as novidades.
            </p>
            <WhatsAppButton href="#cadastro">Quero participar</WhatsAppButton>
          </Reveal>

          <Reveal delay={120}>
            <ChatPanel
              avatar={portraitAsset.url}
              title="Reline • Black Novembro"
              subtitle="Comunidade no WhatsApp"
            >
              <ChatBubble side="in">
                Meninas, a Black começa 04.11 — e vocês vão ver as condições antes de todo mundo 💕
              </ChatBubble>
              <ChatBubble side="out">Já separei minha lista de reposição 🤩</ChatBubble>
              <ChatBubble side="in">
                Hoje tem uma condição nova liberada. Corre que é por tempo limitado ✨
              </ChatBubble>
              <AvatarStack
                avatars={[woman1Asset.url, woman2Asset.url, woman3Asset.url]}
                caption="+ de 1000 pessoas já estão sabendo de tudo em primeira mão!"
              />
            </ChatPanel>
          </Reveal>
        </div>
      </section>

      {/* Linha Reline */}
      <section className="relative bg-cream px-5 py-20">
        <div className="container-page grid items-center gap-20 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-sand shadow-[var(--shadow-soft)]">
              <img
                src={portraitAsset.url}
                alt="Renata Fraga e a linha Reline no Hair Spa"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow mb-4 text-cocoa">Linha Reline</span>
            <h2 className="mb-6 text-pretty text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.2] text-graphite">
              Seu cabelo merece uma Black à altura.
            </h2>
            <p className="mb-7 max-w-[56ch] text-pretty text-[1.05rem] leading-[1.75] text-slate-body">
              Produtos pensados para diferentes necessidades dos fios, da{" "}
              <strong className="font-extrabold text-cocoa">nutrição à reconstrução</strong>,
              hidratação e finalização.
            </p>
            <p className="mb-8 text-[1.05rem] font-semibold leading-[1.75] text-graphite">
              Agora é o momento de se preparar.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {NEEDS.map((need) => (
                <span
                  key={need}
                  className="rounded-[47px] bg-cocoa px-[1.1rem] py-2 text-[0.66rem] font-bold uppercase tracking-[2.82px] text-cream-lt"
                >
                  {need}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cadastro */}
      <section
        id="cadastro"
        className="relative overflow-hidden px-5 py-[5.5rem]"
        style={{ background: "var(--grad-panel-c)" }}
      >
        <div className="grain" aria-hidden="true" />
        <div
          className="absolute -top-[18vw] left-1/2 h-[60vw] w-[60vw] -translate-x-1/2"
          style={{ background: "var(--glow-rose)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[620px] text-center">
          {!sent ? (
            <div>
              <span className="eyebrow mb-5 text-rose">Acesso antecipado</span>
              <h2 className="mb-4 text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.15] text-card-foreground">
                Quero entrar na <em className="font-black-novembro text-rose-lt">Black</em>
              </h2>
              <p className="mx-auto mb-10 max-w-[46ch] text-pretty text-[1.05rem] leading-[1.7] text-foreground/75">
                Preencha seus dados e receba o acesso à comunidade onde as condições são reveladas
                primeiro.
              </p>
              <form
                className="flex flex-col gap-3.5 text-left"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <label className="flex flex-col gap-2">
                  <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-rose-lt/80">
                    Nome
                  </span>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome completo"
                    className="rounded-xl border border-input bg-white/5 px-[1.1rem] py-4 text-card-foreground outline-none focus:border-rose"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-rose-lt/80">
                    WhatsApp
                  </span>
                  <input
                    type="tel"
                    value={zap}
                    onChange={(e) => setZap(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="rounded-xl border border-input bg-white/5 px-[1.1rem] py-4 text-card-foreground outline-none focus:border-rose"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-rose-lt/80">
                    Instagram
                  </span>
                  <input
                    type="text"
                    value={insta}
                    onChange={(e) => setInsta(e.target.value)}
                    placeholder="@seuperfil"
                    className="rounded-xl border border-input bg-white/5 px-[1.1rem] py-4 text-card-foreground outline-none focus:border-rose"
                  />
                </label>
                <button type="submit" className="btn-cta mt-2.5">
                  Quero receber o acesso
                </button>
              </form>
              <p className="mt-5 text-[0.78rem] leading-[1.6] text-muted-foreground">
                *Ao enviar, você concorda com o uso dos seus dados (nome, WhatsApp e Instagram)
                exclusivamente para o envio das condições da campanha e contato da Renata Fraga Hair
                Spa, conforme a LGPD (Lei nº 13.709/2018). Você pode solicitar a exclusão dos seus
                dados a qualquer momento.
              </p>
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-ink-2/70 px-8 py-14">
              <span className="mb-4 block text-[2rem]">🎉</span>
              <h2 className="mb-4 text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold leading-[1.15] text-rose-pale">
                Você está dentro!
              </h2>
              <p className="mx-auto mb-9 max-w-[40ch] text-pretty text-[1.05rem] leading-[1.7] text-foreground/80">
                Agora entre na nossa comunidade para receber as condições da <span className="font-black-novembro">Black Novembro</span> em
                primeira mão.
              </p>
              <WhatsAppButton href="https://chat.whatsapp.com/" size="lg">
                Entrar na comunidade
              </WhatsAppButton>
            </div>
          )}
        </div>
      </section>

      {/* Fechamento */}
      <section
        className="relative overflow-hidden px-5 py-28"
        style={{ background: "var(--grad-panel-b)" }}
      >
        <div className="grain" aria-hidden="true" />
        <div
          className="absolute -bottom-[22vw] left-1/2 h-[62vw] w-[62vw] -translate-x-1/2"
          style={{ background: "var(--glow-rose)" }}
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-[780px] text-center">
          <span className="mb-8 inline-block rounded-[47px] border border-border px-6 py-2 text-[0.66rem] font-bold uppercase tracking-[2.82px] text-rose-lt">
            04 de novembro
          </span>
          <h2 className="font-black-novembro text-metal mb-1 text-[clamp(2rem,6.5vw,4rem)] leading-[1.05]">
            Black Novembro
          </h2>
          <p className="mb-8 text-[clamp(1.4rem,3vw,2.2rem)] font-extrabold italic leading-[1.1] text-card-foreground">
            Reline
          </p>
          <div
            className="mx-auto mb-8 h-px w-[220px]"
            style={{ background: "var(--hairline-rose)" }}
          />
          <p className="mx-auto mb-10 max-w-[46ch] text-pretty text-[1.15rem] leading-[1.7] text-foreground/85">
            Descontos progressivos. Condições especiais. E muitas surpresas. Agora é o momento de se
            preparar.
          </p>
          <WhatsAppButton href="#cadastro" size="lg">
            Entrar na comunidade 💚
          </WhatsAppButton>
        </Reveal>
      </section>

      <footer className="border-t border-border bg-background px-5 py-10 text-center">
        <img
          src={logoAsset.url}
          alt="Reline"
          className="mx-auto mb-3 h-6 w-auto opacity-90"
        />
        <strong className="mb-2 block text-base font-extrabold tracking-[0.04em] text-rose-lt">
          Renata Fraga Hair Spa
        </strong>
        <p className="text-[0.78rem] leading-[1.7] text-muted-foreground">
          Black Novembro 2026
        </p>
      </footer>
      <CookieBanner />
    </div>
  );
}
