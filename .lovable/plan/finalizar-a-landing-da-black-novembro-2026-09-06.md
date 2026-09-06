# Finalizar a landing da Black Novembro

Quatro ajustes num único pacote: conteúdo, captação de leads, limpeza de seção e SEO + publicação.

## 1. Seção da linha Reline

- Remover o rótulo "Linha Reline" acima do título.
- Acrescentar, ao final do bloco de texto, o encerramento que faltava:
  - "BLACK NOVEMBRO RELINE" (com a fonte especial já usada no site)
  - "Descontos progressivos. Condições especiais. E muitas surpresas." em três linhas
  - Botão "Entrar na comunidade" levando ao formulário

Observação: mantenho a grafia "Black Novembro" (sem o "de"), conforme você já definiu antes.

## 2. Formulário com captação real de leads

- Título da seção passa a ser "Quero entrar na Black Novembro".
- Ao enviar, os dados (nome, WhatsApp, Instagram) são gravados de verdade em um banco de dados, não só na tela.
- Em vez da tela de sucesso atual, abre um modal:
  - "VOCÊ ESTÁ DENTRO! 🎉"
  - "Agora entre na nossa comunidade para receber as condições da Black Novembro em primeira mão."
  - Botão "Entrar na comunidade" (link do grupo — me passe o link real quando tiver; por ora fica o link genérico atual).
- Validação básica: nome obrigatório, WhatsApp com formato de telefone, limites de tamanho, mensagens de erro amigáveis.

### Painel interno dos responsáveis

- Endereço não divulgado na página: `/painel`.
- Acesso só com senha (sem usuário), usando `BFReline2026*`.
- A senha fica guardada no servidor, nunca no código da página; a lista de leads só é enviada depois que a senha confere.
- O painel mostra data, nome, WhatsApp e Instagram, do mais recente para o mais antigo, com botão para exportar em CSV.
- A página do painel fica fora do Google (marcada como não indexável e bloqueada no robots).

Para isso preciso ativar o Lovable Cloud (banco de dados integrado, sem contas externas).

## 3. Remover a última dobra

Sai a seção de fechamento com "Black Novembro / Reline" e o botão verde antes do rodapé. A página passa a terminar no formulário e no rodapé.

## 4. SEO e publicação

- Revisar título e descrição da home com data e proposta do evento.
- Adicionar dados estruturados de evento (nome, data de início 04/11, organizador, link), que você poderá atualizar depois com a data e o link definitivos.
- Manter uma única H1 e revisar hierarquia de títulos e textos alternativos das imagens.
- Atualizar `robots.txt` (bloqueando `/painel`) e criar o sitemap com as páginas públicas: home, privacidade e cookies.
- conectar ao google search console para conferir a publicação e SEO da página. 
- Publicar o site ao final.

Sobre conferir no Google: consigo verificar que o título e a descrição estão corretos na página publicada e no que o Google lê, mas a exibição nos resultados de busca depende do rastreamento do Google, que costuma levar de alguns dias a semanas após a publicação. Não é algo que eu consiga forçar no mesmo dia.

## Detalhes técnicos

- Lovable Cloud com tabela `leads` (nome, whatsapp, instagram, criado_em), RLS ativa e GRANTs; inserção só via server function validada com zod; leitura apenas na sessão do painel.
- Gate por senha compartilhada: `PANEL_PASSWORD` e `SESSION_SECRET` como variáveis de servidor, comparação timing-safe em `createServerFn`, sessão criptografada em cookie.
- Modal de sucesso com o Dialog do shadcn já disponível.
- JSON-LD do tipo `Event` na home; `noindex` na rota do painel.