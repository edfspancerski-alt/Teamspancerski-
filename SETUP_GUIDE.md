## 1. Requisitos de Infraestrutura
- **Frontend**: Vercel
- **Backend/Microserviços**: Render ou Railway
- **Banco de Dados**: Neon (PostgreSQL)
- **Cache & Filas**: Redis (Upstash ou Redis Cloud)
- **Vídeo**: Mux ou Cloudflare Stream
- **IA**: OpenAI (GPT-4)

## 2. Configuração do Banco de Dados (Neon)
1. Crie um projeto no [Neon.tech](https://neon.tech).
2. Obtenha a `DATABASE_URL`.
3. Execute as migrações:
   ```bash
   npx prisma db push
   ```

## 3. Configuração do Stripe
1. Crie os produtos "Plano Trimestral" (R$ 749,90) e "Plano Anual" (R$ 2.199,00).
2. Configure o Webhook para apontar para `https://seu-dominio.com/api/webhooks/stripe`.

## 4. Variáveis de Ambiente (.env)
```env
DATABASE_URL="postgres://..."
REDIS_URL="redis://..."
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
OPENAI_API_KEY="sk-..."
JWT_SECRET="sua_chave_secreta"
NEXT_PUBLIC_URL="https://seu-app.com"
```

## 5. Deployment
- **Frontend (Vercel)**: Conecte seu repositório GitHub, selecione o diretório `apps/web`.
- **Backend (Render)**: Configure serviços para cada microserviço em `services/` se optar por infraestrutura distribuída, ou use o monorepo com builds específicos.

## 6. Escalabilidade e Performance
- O sistema utiliza **Redis Cluster** para sessões e rankings.
- **BullMQ** gerencia o processamento assíncrono de vídeos e geração de IA.
- **Prisma** está configurado com pooling de conexões para suportar 1M+ de usuários.
# 🚀 Guia de Configuração para Iniciantes (SaaS Starter)

Este guia foi criado para que qualquer pessoa, mesmo sem experiência prévia em programação, consiga rodar este projeto em sua máquina e transformá-lo em um SaaS real integrado com Stripe, OpenAI, Vercel e Neon.

---

## 🛠️ 1. Instalação de Ferramentas

Antes de começar, você precisa instalar as ferramentas básicas. Clique nos links abaixo e baixe a versão recomendada para o seu sistema (Windows, Mac ou Linux).

1.  **Git:** [Baixar Git](https://git-scm.com/downloads) (Essencial para baixar e atualizar o código).
2.  **Node.js (LTS):** [Baixar Node.js](https://nodejs.org/) (Baixe a versão **LTS** - Long Term Support).
3.  **Docker Desktop:** [Baixar Docker](https://www.docker.com/products/docker-desktop/) (Necessário para rodar o banco de dados localmente, se preferir).

---

## 📂 2. Primeiros Passos no Terminal

O terminal (ou Prompt de Comando/PowerShell) é onde você digitará os comandos.

1.  Abra o terminal do seu computador.
2.  Escolha uma pasta onde deseja salvar o projeto e digite:
    ```bash
    git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
    ```
    *(Troque o link acima pelo link do seu repositório no GitHub)*
3.  Entre na pasta do projeto:
    ```bash
    cd NOME_DO_REPOSITORIO
    ```

---

## 🔐 3. Configuração de "Segredos" (.env)

O arquivo `.env` guarda as chaves secretas do seu site (como senhas do banco de dados).

1.  No terminal, vamos criar e editar este arquivo usando um editor simples chamado `nano`:
    ```bash
    nano .env
    ```
2.  **Como usar o Nano:**
    *   **Colar:** Use `Ctrl+V` (ou clique com o botão direito).
    *   **Salvar:** Pressione `Ctrl + O` e depois a tecla `Enter`.
    *   **Sair:** Pressione `Ctrl + X`.

3.  **Modelo para copiar e colar:**
    Copie o código abaixo e cole dentro do editor `nano`:

    ```env
    # Banco de Dados (Neon.tech ou Local)
    DATABASE_URL="postgresql://usuario:senha@endpoint/dbname?sslmode=require"

    # OpenAI (Para funções de IA)
    OPENAI_API_KEY="sk-..."

    # Stripe (Para pagamentos)
    STRIPE_API_KEY="sk_test_..."
    STRIPE_WEBHOOK_SECRET="whsec_..."
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

    # Autenticação e URL do Site
    NEXTAUTH_SECRET="uma_senha_aleatoria_e_longa"
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

---

## 🗄️ 4. Comandos do Banco de Dados (Prisma)

O **Prisma** é o que organiza as tabelas do seu banco de dados. Para criar as tabelas automaticamente no seu banco (como o Neon), rode:

```bash
npx prisma db push
```

---

## 🏃 5. Como Ligar o Site

Agora que tudo está configurado, vamos baixar as bibliotecas necessárias e ligar o site:

1.  Instale as dependências:
    ```bash
    npm install
    ```
2.  Ligue o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
3.  Abra seu navegador e acesse: `http://localhost:3000`

---

## 🛠️ Configuração Técnica (Evitando Travamentos)

Para garantir que o seu computador não fique lento ao ler arquivos desnecessários, o arquivo `.gitignore` foi configurado para ignorar pastas pesadas como:
*   `node_modules/`
*   `.next/`
*   `.turbo/`
*   `dist/`

Isso resolve problemas de "travamento" no VS Code e em outras ferramentas de desenvolvimento.

---

## 🚀 Próximos Passos: Publicando na Vercel

1.  Crie uma conta na [Vercel](https://vercel.com/).
2.  Conecte seu GitHub.
3.  Importe este repositório.
4.  Adicione as mesmas variáveis do seu `.env` nas configurações da Vercel.
5.  Pronto! Seu site estará online.
