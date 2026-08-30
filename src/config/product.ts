/**
 * Configuração central do produto AdestraPet.
 *
 * O AdestraPet é um produto digital UNIVERSAL de pagamento único.
 * A venda acontece FORA do app — em qualquer plataforma que você
 * escolher (Hotmart, Kiwify, Eduzz, Cakto, etc.).
 *
 * O app NÃO contém nenhum botão de compra, link de checkout ou
 * referência a plataforma de venda. É um produto puro: quem tem
 * o link, usa. Quem não tem, não sabe que existe.
 *
 * Altere aqui qualquer informação de produto — ela se propaga para toda a app.
 */

export const PRODUCT = {
  /** Nome de exibição do produto. */
  name: "AdestraPet",
  /** Tagline curta usada em headers, metadata e telas. */
  tagline: "Treinamento de Cães com Método Positivo",
  /** Versão do produto (exibida no rodapé). */
  version: "1.0.0",

  /** Descrição longa para SEO / Open Graph. */
  description:
    "AdestraPet é o programa completo de adestramento de cães em português: treinos passo a passo, agenda, acompanhamento de progresso e dicas diárias. Funciona offline no seu navegador.",

  /** URL base canônica do site (sem barra final). Usada para OG, sitemap, robots. */
  siteUrl: "https://adestrapet.vercel.app",

  /** Contato de suporte (exibido publicamente). */
  supportEmail: "contato@adestrapet.example.com",
} as const;
