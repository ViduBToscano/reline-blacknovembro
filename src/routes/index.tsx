import dep1 from "@/assets/depoimento-1.mp4.asset.json";
import dep2 from "@/assets/depoimento-2.mp4.asset.json";
import dep3 from "@/assets/depoimento-3.mp4.asset.json";
import poster1 from "@/assets/depoimento-poster-1.jpg.asset.json";
import poster2 from "@/assets/depoimento-poster-2.jpg.asset.json";
import poster3 from "@/assets/depoimento-poster-3.jpg.asset.json";
import felipeAntes from "@/assets/felipe-saraiva-antes.jpg.asset.json";
import felipeDepois from "@/assets/felipe-saraiva-depois.jpg.asset.json";
import janeiroAntes from "@/assets/janeiro-antes.jpg.asset.json";
import janeiroDepois from "@/assets/janeiro-depois.jpg.asset.json";
import julianaAntes from "@/assets/juliana-santos-antes.jpg.asset.json";
import julianaDepois from "@/assets/juliana-santos-depois.jpg.asset.json";
import patriciaAntes from "@/assets/patricia-pinho-antes.jpg.asset.json";
import patriciaDepois from "@/assets/patricia-pinho-depois.jpg.asset.json";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { submitLead, trackEvent } from "@/lib/leads.functions";

import heroAsset from "@/assets/reline-hero.jpg.asset.json";
import logoAsset from "@/assets/logo_reline.png.asset.json";
import portraitAsset from "@/assets/reline-portrait.jpg.asset.json";
import { Reveal } from "@/components/reline/Reveal";
import { BeforeAfterSlider } from "@/components/reline/BeforeAfterSlider";
import { WhatsAppButton } from "@/components/reline/WhatsAppButton";
import CookieBanner from "@/components/reline/CookieBanner";

// Seção "Descontos progressivos" oculta por solicitação — troque para true para exibi-la novamente
const SHOW_CAMPANHA = false;

const EVENT_START = "2026-11-04T00:00:00-03:00";

const EVENT_END = "2026-11-30T23:59:59-03:00";
const EVENT_URL = "https://reline-blacknovembro.lovable.app/";

const TESTIMONIALS = [
  { video: dep1.url, poster: poster1.url },
  { video: dep2.url, poster: poster2.url },
  { video: dep3.url, poster: poster3.url },
];

const BEFORE_AFTER_RESULTS = [
  { before: felipeAntes.url, after: felipeDepois.url, alt: "Resultado real de tratamento capilar" },
  { before: janeiroAntes.url, after: janeiroDepois.url, alt: "Resultado real em cabelo longo" },
  { before: julianaAntes.url, after: julianaDepois.url, alt: "Resultado real em cabelo cacheado" },
  { before: patriciaAntes.url, after: patriciaDepois.url, alt: "Resultado real em cabelo curto e cacheado" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Black November Reline 2026 | Descontos progressivos a partir de 04.11" },
      {
        name: "description",
        content:
          "A Black November da Reline começa em 04 de novembro com descontos progressivos em produtos de nutrição, reconstrução, hidratação e finalização. Entre na comunidade e saiba das condições antes de todo mundo.",
      },
      { property: "og:title", content: "Black November Reline 2026" },
      {
        property: "og:description",
        content:
          "Descontos progressivos em produtos Reline a partir de 04 de novembro. Quem está na comunidade sabe primeiro.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: EVENT_URL },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Black November Reline 2026" },
      {
        name: "twitter:description",
        content:
          "Descontos progressivos em produtos Reline a partir de 04 de novembro. A comunidade sabe primeiro.",
      },
    ],
    links: [{ rel: "canonical", href: EVENT_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SaleEvent",
          name: "Black November Reline 2026",
          description:
            "Campanha Black November da Reline com descontos progressivos em produtos para nutrição, reconstrução, hidratação e finalização dos cabelos.",
          startDate: EVENT_START,
          endDate: EVENT_END,
          eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          url: EVENT_URL,
          location: {
            "@type": "VirtualLocation",
            url: EVENT_URL,
          },
          organizer: {
            "@type": "Organization",
            name: "Renata Fraga Hair Spa",
            url: EVENT_URL,
          },
          inLanguage: "pt-BR",
        }),
      },
    ],
  }),
  component: Index,
});


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
  const enviarLead = useServerFn(submitLead);
  const registrar = useServerFn(trackEvent);
  const [nome, setNome] = useState("");
  const [zap, setZap] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLElement | null>(null);

  const track = (
    event: "form_view" | "form_submit_click" | "popup_view" | "community_click" | "offer_click",
  ) => {
    void registrar({ data: { event } }).catch(() => {});
  };

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!done && entries.some((e) => e.isIntersecting)) {
          done = true;
          track("form_view");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sent) track("popup_view");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    track("form_submit_click");

    if (nome.trim().length < 2) {
      setErro("Por favor, informe seu nome.");
      return;
    }
    const zapLimpo = zap.replace(/\D/g, "");
    if (zapLimpo.length < 10 || zapLimpo.length > 13) {
      setErro("Informe um WhatsApp válido com DDD.");
      return;
    }

    const emailLimpo = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailLimpo) || emailLimpo.length > 255) {
      setErro("Informe um e-mail válido.");
      return;
    }

    setEnviando(true);
    try {
      const res = await enviarLead({
        data: {
          nome: nome.trim().slice(0, 100),
          whatsapp: zap.trim().slice(0, 25),
          email: emailLimpo,
        },
      });
      if (!res.ok) {
        setErro("Não conseguimos enviar agora. Tente novamente em instantes.");
        return;
      }
      setSent(true);
    } catch {
      setErro("Não conseguimos enviar agora. Tente novamente em instantes.");
    } finally {
      setEnviando(false);
    }
  };


  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      {/* Top bar */}
      <div className="overflow-hidden border-b border-border bg-ink-2 py-3 text-[0.68rem] font-semibold uppercase tracking-[1.44px] text-rose-lt">
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <div key={i} className="marquee-group" aria-hidden={i === 1}>
              <span>Black November Reline</span>
              <span className="text-rose/55">•</span>
              <span>Começa 04.11</span>
              <span className="text-rose/55">•</span>
              <span className="text-rose-pale/75">Quem está na comunidade sabe primeiro</span>
              <span className="text-rose/55">•</span>
            </div>
          ))}
        </div>
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
        <div className="container-page relative py-14 sm:py-20">
          <div className="max-w-[620px]">
            <img src={logoAsset.url} alt="Reline" className="mb-5 h-7 w-auto sm:mb-6 sm:h-8" />
            <h1 className="m-0">
              <span className="sr-only">Black November Reline 2026</span>
              <span
                aria-hidden="true"
                className="font-black-novembro text-metal block text-[clamp(3.4rem,17vw,8.5rem)] leading-[0.9] sm:leading-[0.86]"
              >
                BLACK
              </span>
              <span
                aria-hidden="true"
                className="font-black-novembro mb-6 mt-1 block text-[clamp(1.6rem,8vw,3.6rem)] uppercase leading-[1.05] text-rose-pale sm:mb-8"
              >
                novembro
              </span>
            </h1>

            <h2 className="font-black-novembro mb-3 text-pretty text-[clamp(1.05rem,3.8vw,1.45rem)] uppercase leading-[1.3] text-card-foreground sm:mb-4 sm:leading-[1.15]">
              A Black mais esperada do ano está chegando.
            </h2>
            <p className="mb-5 max-w-[52ch] text-pretty text-[0.95rem] leading-[1.7] text-foreground/80 sm:mb-6 sm:text-[1.05rem] sm:leading-[1.75]">
              <strong className="font-semibold text-foreground">E quem estiver na comunidade vai saber primeiro.</strong>{"\u00a0"}
              A partir de 04 de novembro, a Reline preparou uma Black especial com <strong className="font-semibold text-foreground">descontos progressivos</strong> para você cuidar dos seus cabelos e aproveitar condições que não estarão disponíveis o ano todo.
            </p>
            <p className="mb-7 max-w-[52ch] text-pretty text-[0.95rem] leading-[1.7] text-foreground/80 sm:mb-9 sm:text-[1.05rem] sm:leading-[1.75]">
              Entre para a comunidade e receba tudo em primeira mão.
            </p>

            <WhatsAppButton href="#cadastro" size="lg" className="w-full sm:w-auto" onClick={() => track("offer_click")}>
              Quero entrar na comunidade
            </WhatsAppButton>
            <p className="mt-4 text-[0.75rem] leading-relaxed text-muted-foreground sm:text-[0.78rem]">
              *Vagas/participação limitada à comunidade.
            </p>
          </div>
        </div>
      </section>

      {/* Campanha — seção oculta por solicitação; para reativar, mude SHOW_CAMPANHA para true */}
      {SHOW_CAMPANHA && (
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
        <div className="container-page relative mx-auto max-w-[680px] text-center">
          <Reveal>
            <span className="eyebrow mb-4 text-rose">Descontos progressivos</span>
            <h2 className="mb-5 text-pretty text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.2] text-card-foreground">
              Quanto mais você cuida, mais você economiza.
            </h2>
            <p className="mx-auto mb-6 max-w-[54ch] text-pretty text-[1.05rem] leading-[1.75] text-foreground/80">
              Monte seu ritual Reline e aproveite os descontos progressivos da{" "}
              <span className="font-black-novembro">Black November</span>.
            </p>
            <div className="mb-7">
              <span className="mb-1 block text-[0.72rem] font-bold uppercase tracking-[0.2em] text-rose">
                Descontos de até
              </span>
              <span className="font-black-novembro text-metal m-0 block px-2 pb-4 pt-2 text-[clamp(2.8rem,5.5vw,4.4rem)] uppercase leading-[1.1] -my-2">
                80% OFF
              </span>
              <span className="block text-[0.72rem] font-bold uppercase tracking-[0.2em] text-rose">
                em produtos selecionados
              </span>
            </div>
            <p className="mb-8 text-[1rem] leading-[1.6] text-foreground/85">
              Lives com condições inéditas, presentes e kits exclusivos com descontos
              progressivos.
            </p>
            <WhatsAppButton href="#cadastro" onClick={() => track("offer_click")}>
              Conferir ofertas
            </WhatsAppButton>
          </Reveal>
        </div>
      </section>
      )}


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

      {/* Antes e depois */}
      <section className="relative bg-cream px-5 py-20">
        <div className="container-page relative">
          <Reveal className="mx-auto mb-12 max-w-[780px] text-center">
            <span className="eyebrow mb-4 text-cocoa">Antes e depois</span>
            <h2 className="text-pretty text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.2] text-graphite">
              Resultados Reais de quem usa e aprova Reline há 9 anos.
            </h2>
          </Reveal>

          <div className="mx-auto grid w-full max-w-[640px] gap-5 sm:grid-cols-2">
            {BEFORE_AFTER_RESULTS.map((result, i) => (
              <Reveal key={result.before} delay={i * 80}>
                <BeforeAfterSlider {...result} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos em vídeo */}
      <section
        className="relative overflow-hidden px-5 py-20"
        style={{ background: "var(--grad-panel-b)" }}
      >
        <div className="grain" aria-hidden="true" />
        <div className="container-page relative">
          <Reveal className="mx-auto mb-14 max-w-[720px] text-center">
            <span className="eyebrow mb-4 text-rose">Quem usa, sente a diferença.</span>
            <h2 className="text-pretty text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.2] text-card-foreground">
              Resultados que fazem parte da rotina de quem escolheu cuidar dos cabelos com Reline.
            </h2>
          </Reveal>

          {/* Placeholders para os 3 depoimentos em vídeo */}
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 90}>
                <figure className="flex h-full flex-col rounded-3xl bg-white p-3 shadow-[var(--shadow-soft)]">
                  <video
                    src={t.video}
                    poster={t.poster}
                    controls
                    playsInline
                    preload="none"
                    className="aspect-[9/16] w-full rounded-2xl bg-graphite object-cover"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Linha Reline */}
      <section className="relative bg-cream px-5 py-20">
        <div className="container-page grid items-center gap-12 sm:gap-16 lg:grid-cols-[minmax(320px,1.1fr)_minmax(360px,1fr)] lg:gap-20">
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
            
            <h2 className="mb-6 text-pretty text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.2] text-graphite">
              Renata Fraga 15 anos de Transformação capilar
            </h2>
            <p className="mb-5 max-w-[56ch] text-pretty text-[1.05rem] leading-[1.75] text-slate-body">
              Renata Fraga é tricologista e terapeuta capilar, com 15 anos de experiência no mercado
              e uma trajetória dedicada à saúde e transformação dos cabelos.
            </p>
            <p className="mb-5 max-w-[56ch] text-pretty text-[1.05rem] leading-[1.75] text-slate-body">
              À frente de seu espaço em Belo Horizonte, já atendeu mais de{" "}
              <strong className="font-extrabold text-cocoa">12 mil pessoas</strong>, incluindo
              celebridades como{" "}
              <strong className="font-extrabold text-cocoa">Hulk Paraíba</strong>,{" "}
              <strong className="font-extrabold text-cocoa">Dani Cicarelli</strong>,{" "}
              <strong className="font-extrabold text-cocoa">Ticiane Pinheiro</strong>,{" "}
              <strong className="font-extrabold text-cocoa">Shantal</strong>,{" "}
              <strong className="font-extrabold text-cocoa">Carol Marra</strong> e{" "}
              <strong className="font-extrabold text-cocoa">Juju Norremose</strong>.
            </p>
            <p className="mb-5 max-w-[56ch] text-pretty text-[1.05rem] leading-[1.75] text-slate-body">
              Sua experiência no atendimento e sua busca constante por soluções para as diferentes
              necessidades dos cabelos deram origem à Reline, marca criada por Renata e totalmente
              dedicada ao tratamento do couro cabeludo e dos fios.
            </p>
            <p className="max-w-[56ch] text-pretty text-[1.05rem] font-extrabold leading-[1.75] text-cocoa">
              Hoje, Renata une tricologia, experiência prática e inovação para transformar a forma
              como profissionais e clientes entendem e cuidam dos cabelos.
            </p>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <div className="mt-12 flex justify-center">
            <WhatsAppButton href="#cadastro" size="lg" className="w-full max-w-[440px]" onClick={() => track("offer_click")}>
              Entrar na comunidade
            </WhatsAppButton>
          </div>
        </Reveal>
      </section>

      {/* Banner OFF + contagem */}
      <section className="relative overflow-hidden bg-cream px-5 py-16">
        <div
          className="absolute -top-[22vw] left-1/2 h-[55vw] w-[55vw] -translate-x-1/2"
          style={{ background: "var(--glow-rose)" }}
          aria-hidden="true"
        />
        <div className="container-page relative text-center">
          <Reveal>
            <span className="eyebrow mb-3 text-cocoa"></span>
            <p className="font-black-novembro m-0 text-[clamp(3.4rem,10vw,7.8rem)] uppercase leading-[0.9] text-rose-dk">
              Até 80% off
            </p>
            <p className="mx-auto mt-4 max-w-[54ch] text-pretty text-[1.08rem] font-semibold leading-[1.65] text-slate-body">
              Descontos progressivos e condições especiais em lives exclusivas. Surpresas especiais para a comunidade.&nbsp;
            </p>
            <div className="mb-9 mt-8 flex flex-wrap items-stretch justify-center gap-2.5">
              <div className="mr-1.5 flex flex-none flex-col justify-center border-r border-cocoa/25 py-3 pr-6 text-left">
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-rose-dk">
                  Começa em
                </span>
                <strong className="text-[1.9rem] font-extrabold leading-none tracking-[-0.02em] text-graphite">
                  04.11
                </strong>
              </div>
              {clock.map((unit) => (
                <div
                  key={unit.k}
                  className="min-w-[76px] rounded-xl border border-cocoa/20 bg-white/80 px-2 py-3 text-center"
                >
                  <strong className="block text-[1.75rem] font-extrabold leading-[1.1] tabular-nums text-graphite">
                    {unit.v}
                  </strong>
                  <span className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-cocoa">
                    {unit.k}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <a href="#cadastro" className="btn-cta" onClick={() => track("offer_click")}>
                Quero entrar na comunidade agora mesmo!
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cadastro */}
      <section
        id="cadastro"
        ref={formRef}
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
          <div>
            <span className="eyebrow mb-5 text-rose">Black November Reline</span>
            <h2 className="mb-4 text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.15] text-card-foreground">
              É hora de cuidar do seu cabelo.
            </h2>
            <p className="mx-auto mb-10 max-w-[46ch] text-pretty text-[1.05rem] leading-[1.7] text-foreground/75">
              A <span className="font-black-novembro text-rose-lt">Black November</span> já começou.{" "}
              <strong className="font-extrabold text-rose-lt">Até 80% off</strong> em produtos
              selecionados, condições especiais e descontos progressivos. Preencha seus dados e
              receba as condições em primeira mão através da nossa comunidade.
            </p>
            <form className="flex flex-col gap-3.5 text-left" onSubmit={handleSubmit} noValidate>
              <label className="flex flex-col gap-2">
                <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-rose-lt/80">
                  Nome
                </span>
                <input
                  type="text"
                  value={nome}
                  maxLength={100}
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
                  maxLength={25}
                  onChange={(e) => setZap(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="rounded-xl border border-input bg-white/5 px-[1.1rem] py-4 text-card-foreground outline-none focus:border-rose"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-rose-lt/80">
                  E-mail
                </span>
                <input
                  type="email"
                  value={email}
                  maxLength={255}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="rounded-xl border border-input bg-white/5 px-[1.1rem] py-4 text-card-foreground outline-none focus:border-rose"
                />
              </label>
              {erro && (
                <p role="alert" className="text-[0.85rem] font-semibold text-rose-lt">
                  {erro}
                </p>
              )}
              <button type="submit" className="btn-cta mt-2.5" disabled={enviando}>
                {enviando ? "Enviando…" : "Quero aproveitar!"}
              </button>
            </form>
            <p className="mt-5 text-[0.78rem] leading-[1.6] text-muted-foreground">
              *Ao enviar, você concorda com o uso dos seus dados (nome, WhatsApp e e-mail)
              exclusivamente para o envio das condições da campanha e contato da Renata Fraga Hair
              Spa, conforme a LGPD (Lei nº 13.709/2018) e a nossa{" "}
              <Link to="/privacidade" className="underline underline-offset-2 hover:text-rose-lt">
                Política de Privacidade
              </Link>
              . Você pode solicitar a exclusão dos seus dados a qualquer momento.
            </p>
          </div>
        </div>
      </section>

      <Dialog open={sent} onOpenChange={setSent}>
        <DialogContent className="border-border bg-ink-2 text-center sm:max-w-[460px]">
          <DialogHeader>
            <span className="mb-1 block text-[2rem]">🎉</span>
            <DialogTitle className="text-center text-[clamp(1.5rem,4vw,2rem)] font-extrabold leading-[1.15] text-rose-pale">
              Você está dentro!
            </DialogTitle>
            <DialogDescription className="mx-auto max-w-[36ch] text-pretty text-center text-[1rem] leading-[1.7] text-foreground/80">
              Agora entre na nossa comunidade para receber as condições da{" "}
              <span className="font-black-novembro">Black November</span> em primeira mão.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-center">
            <span onClick={() => track("community_click")}>
              <WhatsAppButton
                href="https://chat.whatsapp.com/"
                size="lg"
                onClick={() => track("community_click")}
              >
                Entrar na comunidade
              </WhatsAppButton>
            </span>
          </div>
        </DialogContent>
      </Dialog>


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
          Black November 2026
        </p>
        <p className="mt-1 text-[0.78rem] italic leading-[1.7] text-muted-foreground">
          Tratamento que transforma o cuidado em resultado.
        </p>
      </footer>
      <CookieBanner />
    </div>
  );
}
