import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies — Reline Cosméticos" },
      {
        name: "description",
        content:
          "Entenda quais cookies a Reline Cosméticos utiliza nesta página, para que servem e como gerenciar seu consentimento.",
      },
      { property: "og:title", content: "Política de Cookies — Reline Cosméticos" },
      {
        property: "og:description",
        content:
          "Entenda quais cookies a Reline Cosméticos utiliza nesta página, para que servem e como gerenciar seu consentimento.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://reline-blacknovembro.lovable.app/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://reline-blacknovembro.lovable.app/cookies" }],
  }),
  component: CookiesPage,
});

const sections: { title: string; body: string[] }[] = [
  {
    title: "1. O que são cookies",
    body: [
      "Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita um site. Eles permitem lembrar preferências e entender como a página é utilizada.",
    ],
  },
  {
    title: "2. Cookies que utilizamos",
    body: [
      "Cookies essenciais: necessários para o funcionamento básico do site e para registrar a sua escolha de consentimento. Eles não podem ser desativados.",
      "Cookies de medição de audiência: utilizados apenas com o seu aceite, para entender visitas e interações e melhorar a experiência da página.",
      "Pixel da Meta (Facebook/Instagram): utilizado apenas com o seu aceite, para medir a eficácia das nossas campanhas de divulgação, registrando ações como o envio do formulário de inscrição.",
    ],
  },
  {
    title: "3. Como gerenciar seu consentimento",
    body: [
      "Ao entrar na página, você pode aceitar ou rejeitar os cookies de medição no banner de consentimento.",
      "Você também pode apagar os cookies e o armazenamento local do site nas configurações do seu navegador a qualquer momento; nesse caso, o banner voltará a aparecer na próxima visita.",
    ],
  },
  {
    title: "4. Cookies de terceiros",
    body: [
      "Ferramentas de terceiros (como serviços de análise de audiência e o Pixel da Meta, de Meta Platforms, Inc.) podem definir cookies próprios quando ativadas mediante o seu consentimento. O tratamento feito por esses terceiros segue as políticas de privacidade deles.",
    ],
  },
  {
    title: "5. Atualizações desta política",
    body: [
      "Esta Política de Cookies pode ser atualizada a qualquer momento. A versão vigente estará sempre disponível nesta página.",
    ],
  },
];

function CookiesPage() {
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
          Política de Cookies
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
          Dúvidas sobre cookies? Fale com a gente:{" "}
          <span className="font-semibold text-ink">[colocar e-mail aqui]</span>
        </p>
      </div>
    </main>
  );
}
