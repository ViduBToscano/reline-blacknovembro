import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Reline Cosméticos" },
      {
        name: "description",
        content:
          "Saiba como a Reline Cosméticos coleta, usa e protege seus dados pessoais, conforme a LGPD (Lei nº 13.709/2018).",
      },
      { property: "og:title", content: "Política de Privacidade — Reline Cosméticos" },
      {
        property: "og:description",
        content:
          "Saiba como a Reline Cosméticos coleta, usa e protege seus dados pessoais, conforme a LGPD (Lei nº 13.709/2018).",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacidade" },
    ],
    links: [{ rel: "canonical", href: "/privacidade" }],
  }),
  component: PrivacidadePage,
});

const sections: { title: string; body: string[] }[] = [
  {
    title: "1. Quem somos",
    body: [
      "Reline Cosméticos é a controladora dos dados pessoais coletados nesta página, no contexto da campanha Black Novembro e dos serviços do Renata Fraga Hair Spa.",
      "Encarregado de dados (DPO): [colocar e-mail aqui].",
    ],
  },
  {
    title: "2. Quais dados coletamos",
    body: [
      "Nome e telefone/WhatsApp informados por você no formulário de cadastro desta página.",
      "Dados de navegação e cookies, conforme descrito na nossa Política de Cookies.",
    ],
  },
  {
    title: "3. Para que usamos seus dados",
    body: [
      "Entrar em contato pelo WhatsApp para dar acesso antecipado às condições da Black Novembro.",
      "Enviar comunicações sobre a campanha, ofertas e novidades da Reline Cosméticos.",
      "Medir a audiência e melhorar a experiência desta página.",
    ],
  },
  {
    title: "4. Base legal",
    body: [
      "O tratamento dos dados pessoais é realizado com base no seu consentimento (art. 7º, I, da Lei nº 13.709/2018 — LGPD) e no legítimo interesse para medição de audiência (art. 7º, IX).",
    ],
  },
  {
    title: "5. Compartilhamento",
    body: [
      "Não vendemos seus dados. O compartilhamento ocorre apenas com operadores essenciais à operação (por exemplo, plataformas de hospedagem e mensageria), sempre sob obrigações de segurança e confidencialidade.",
    ],
  },
  {
    title: "6. Seus direitos",
    body: [
      "Você pode solicitar, a qualquer momento, a confirmação, o acesso, a correção, a anonimização, a portabilidade ou a eliminação dos seus dados pessoais, bem como revogar o consentimento.",
      "Para exercer seus direitos, escreva para: [colocar e-mail aqui].",
    ],
  },
  {
    title: "7. Segurança e retenção",
    body: [
      "Adotamos medidas técnicas e organizacionais para proteger seus dados. Eles são mantidos apenas pelo tempo necessário às finalidades descritas ou enquanto houver obrigação legal.",
    ],
  },
  {
    title: "8. Alterações desta política",
    body: [
      "Esta política pode ser atualizada a qualquer momento. A versão vigente estará sempre disponível nesta página.",
    ],
  },
];

function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-cream-lt text-ink">
      <div className="container-page max-w-[820px] py-16 sm:py-24">
        <Link
          to="/"
          className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-rose-dk hover:underline"
        >
          ← Voltar para a página inicial
        </Link>
        <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-3 text-[0.9rem] text-ink/60">
          Última atualização: setembro de 2026 · Reline Cosméticos
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-extrabold">{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-2 text-[0.95rem] leading-[1.8] text-ink/80">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-ink/10 pt-6 text-[0.85rem] text-ink/60">
          Dúvidas sobre esta política? Fale com a gente:{" "}
          <span className="font-semibold text-ink">[colocar e-mail aqui]</span>
        </p>
      </div>
    </main>
  );
}
