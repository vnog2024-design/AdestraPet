# AdestraPet — Programa Completo de Adestramento de Cães

Aplicativo web **100% client-side** para adestramento de cães em português, vendido como **produto digital de pagamento único**.

- ❌ **Sem Inteligência Artificial** (nenhuma chamada de API, nenhum SDK de IA)
- ❌ **Sem banco de dados** (nenhum Prisma, SQLite, Supabase, MongoDB)
- ❌ **Sem servidor obrigatório** (apenas Next.js estático na Vercel)
- ❌ **Sem assinatura** — pagamento único, acesso completo a todos
- ❌ **Sem área gratuita/premium** — quem compra tem acesso a tudo
- ❌ **Sem códigos de ativação dentro do app** — a venda acontece fora
- ✅ **Armazenamento local** (localStorage via Zustand persist)
- ✅ **Funciona offline** depois do primeiro carregamento (Service Worker)
- ✅ **SEO completo** (Open Graph, Twitter cards, sitemap, robots, manifest)
- ✅ **Acessível** (WCAG 2.1 AA, navegação por teclado, ARIA labels)
- ✅ **Responsivo** (360px → 1440px+)

---

## ✨ Funcionalidades

- Cadastro do cachorro (nome, raça, idade, peso, personalidade, objetivos)
- Dashboard com estatísticas (sequência de dias, minutos treinados, sessões)
- **12 exercícios completos** em 4 categorias (Obediência, Truques, Comportamento, Socialização)
- Sessão ativa de treino com cronômetro passo a passo
- Agenda completa de treinos
- Gráficos de progresso (barras dos últimos 7 dias, pizza por categoria)
- Acompanhamento ilimitado de sessões e estatísticas
- Dica do dia rotativa

Todos os exercícios estão disponíveis para todos os usuários — não há divisão gratuita/premium.

---

## 🛒 Modelo de venda

O AdestraPet é um produto digital **pago uma vez, acesso completo**.

A venda acontece **fora do app**, em uma plataforma de produtos digitais:
- Hotmart, Kiwify, Eduzz, Cakto, etc.
- O cliente paga na plataforma → recebe o link de acesso ao app
- Pronto. Sem login, sem ativação, sem código.

Para alterar a URL exibida em CTAs opcionais do app, edite `purchaseUrl` em `src/config/product.ts`.

---

## 🛠 Stack técnica

| Camada | Tecnologia |
|--------|------------|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5 |
| Estilo | Tailwind CSS 4 + shadcn/ui (New York) |
| Estado | Zustand (+ persist middleware) |
| Gráficos | Recharts |
| Animações | Framer Motion |
| Ícones | lucide-react |
| Notificações | sonner |
| PWA | manifest.webmanifest + sw.js |

**Sem backend.** Sem Prisma. Sem SQLite. Sem z-ai-web-dev-sdk. Sem NextAuth. Sem NextIntl.

---

## 📦 Como instalar

Pré-requisitos: **Node.js 18.18+** (ou 20+) e **npm**.

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/adestrapet.git
cd adestrapet

# 2. Instale as dependências
npm install
```

> Não há variáveis de ambiente obrigatórias para rodar localmente.
> Não há chaves de API para configurar.

---

## 🚀 Como executar localmente

```bash
npm run dev
```

Acesse http://localhost:3000 no navegador.

---

## 🔨 Como fazer build

```bash
npm run build
```

O build Next.js padrão pode ser servido com:

```bash
npm run start
```

---

## ☁️ Como publicar na Vercel

1. Faça push do código para o GitHub.
2. Acesse https://vercel.com e clique em **Add New Project**.
3. Importe o repositório do GitHub.
4. A Vercel detecta Next.js automaticamente — **não precisa configurar nada**:
   - Build Command: `next build` (padrão)
   - Output: `.next` (padrão)
   - Variáveis de ambiente: **nenhuma obrigatória**
5. Clique em **Deploy**.

Pronto. Em poucos minutos seu app estará em `https://adestrapet.vercel.app` (ou no domínio que você configurar).

---

## 🔗 Como conectar ao GitHub

```bash
git init
git add .
git commit -m "feat: AdestraPet v1.0"
git branch -M main
git remote add origin https://github.com/seu-usuario/adestrapet.git
git push -u origin main
```

---

## 💾 Como funciona o armazenamento local

Tudo é salvo no `localStorage` do navegador do usuário, via [Zustand persist](https://docs.pmnd.rs/zustand/integrations/persisting-store):

- **`adestrapet-store`** — perfil do cachorro, sessões de treino, agenda

Vantagens:
- Zero custo de infraestrutura por usuário
- Dados ficam no dispositivo do usuário (privacidade total)
- App funciona offline depois do primeiro carregamento

Desvantagens:
- Limpar dados do navegador = perder progresso
- Não há sincronização entre dispositivos

---

## 🛒 Como alterar o link de compra (opcional)

O app pode exibir CTAs opcionais com o link de compra (por exemplo, se você quiser mostrar um banner promocional). Edite **uma única linha** em `src/config/product.ts`:

```ts
export const PRODUCT = {
  // ...
  purchaseUrl: "https://sua-plataforma.com/checkout/adestrapet", // ← mude aqui
  ctaButtonLabel: "QUERO ACESSAR O ADESTRAPET", // ← mude aqui
}
```

Se não quiser exibir nenhum CTA, defina `purchaseUrl: ""`.

> O app **não exige** ativação — esse link é apenas informativo/promocional.
> Quem comprar na plataforma externa recebe o link direto do app já acessível.

---

## ➕ Como adicionar novos conteúdos

### Novo exercício

Edite `src/lib/training-data.ts` e adicione um objeto ao array `TRAINING_EXERCISES`:

```ts
{
  id: "novo-exercicio",
  name: "Nome do Exercício",
  category: "obediencia", // ou "tricks" | "comportamento" | "socializacao"
  difficulty: "iniciante", // ou "intermediario" | "avancado"
  description: "Descrição curta.",
  icon: "Dog", // ver lista em training-data.ts
  durationMin: 10,
  steps: [
    { title: "Passo 1", description: "...", duration: 3 },
    // ...
  ],
  tips: ["Dica 1", "Dica 2"],
  reward: "Petisco + carinho",
}
```

O novo exercício ficará disponível para todos os usuários automaticamente.

---

## 🗑 Dependências removidas (do template original)

As seguintes dependências foram removidas:

| Pacote | Motivo |
|--------|--------|
| `@prisma/client`, `prisma` | Não há banco de dados |
| `z-ai-web-dev-sdk` | Não há IA |
| `next-auth` | Não há autenticação |
| `next-intl` | App é monolíngue (pt-BR) |
| `next-themes` | Sem toggle de tema |
| `@dnd-kit/*` | Não usado |
| `@hookform/resolvers`, `react-hook-form` | Formulários são controlados localmente |
| `@mdxeditor/editor` | Não usado |
| `@reactuses/core` | Não usado |
| `@tanstack/react-query`, `@tanstack/react-table` | Não usado |
| `react-markdown`, `react-syntax-highlighter` | Conteúdo é estático |
| `react-resizable-panels` | Não usado |
| `sharp` | Ícones gerados por script Python |
| `uuid` | IDs gerados manualmente |
| `zod` | Sem API para validar |
| `bun-types` | Não usado com bun em produção |
| 22 pacotes `@radix-ui/react-*` não usados | Apenas os necessários foram mantidos |
| `tailwindcss-animate` | Substituído por `tw-animate-css` |
| `cmdk`, `input-otp`, `react-day-picker`, `vaul`, `embla-carousel-react`, `date-fns` | Não usados |

---

## 📁 Estrutura do projeto

```
adestrapet/
├── public/
│   ├── icon.svg              ← logo vetorial
│   ├── icon-192.png          ← ícone PWA 192x192
│   ├── icon-512.png          ← ícone PWA 512x512
│   ├── icon-512-maskable.png ← ícone maskable
│   ├── apple-icon.png        ← ícone iOS 180x180
│   ├── og-image.png          ← imagem Open Graph
│   ├── favicon.ico           ← favicon multiresolution
│   └── sw.js                 ← service worker (cache offline)
├── scripts/
│   ├── gen-icons.py          ← script para regenerar ícones
│   ├── find-unused-ui.py     ← utilitário: detecta componentes UI órfãos
│   └── find-unused-deps.py   ← utilitário: detecta deps npm órfãs
├── src/
│   ├── app/
│   │   ├── layout.tsx        ← metadata + SEO + fontes + SW register
│   │   ├── page.tsx          ← rota principal (client)
│   │   ├── globals.css       ← tema âmbar
│   │   ├── manifest.ts       ← PWA manifest
│   │   ├── robots.ts         ← robots.txt dinâmico
│   │   └── sitemap.ts        ← sitemap.xml dinâmico
│   ├── config/
│   │   └── product.ts        ← ⭐ configuração central do produto
│   ├── lib/
│   │   ├── types.ts          ← tipos TypeScript
│   │   ├── training-data.ts  ← 12 exercícios + raças + dicas
│   │   └── helpers.ts        ← funções utilitárias
│   ├── store/
│   │   └── dog-store.ts      ← perfil + sessões + agenda (persist)
│   ├── hooks/
│   │   ├── use-hydrated.ts   ← SSR-safe hydration
│   │   └── use-mobile.ts     ← detecção de mobile
│   └── components/
│       ├── onboarding.tsx
│       ├── bottom-nav.tsx
│       ├── active-session.tsx
│       ├── sw-register.tsx
│       ├── ui/               ← shadcn/ui (componentes)
│       └── tabs/
│           ├── home-tab.tsx
│           ├── training-tab.tsx
│           ├── schedule-tab.tsx
│           ├── progress-tab.tsx
│           └── dog-tab.tsx
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

---

## 🔐 Segurança

- **Nenhuma chave secreta** no código frontend.
- **Nenhuma variável de ambiente obrigatória**.
- O app não envia dados para servidor nenhum — tudo fica no dispositivo do usuário.
- Para validar vulnerabilidades de dependências: `npm audit`.

---

## 📝 Licença

Este é um produto comercial. Todos os direitos reservados.
Você pode modificar o código para uso próprio, mas não redistribuir.

---

## 🆘 Suporte

- Email: `contato@adestrapet.example.com` (configure em `src/config/product.ts`)

---

Feito com 🐾 para tutores de cães brasileiros.
