# Team Spancerski - Guia de Implantação e Operação

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

## 6. Desenvolvimento no Codespaces
O projeto está configurado para **GitHub Codespaces**. Para iniciar o desenvolvimento em segundos:
1. Abra o repositório no GitHub.
2. Clique em **Code** -> **Codespaces** -> **Create codespace on main**.
3. O ambiente será configurado automaticamente (dependências, Prisma).
4. Configure as chaves no arquivo `.env` gerado.

## 7. Comandos Rápidos (Terminal)
Se você precisar executar manualmente no terminal do Codespaces ou localmente:

```bash
# 1. Instalar todas as dependências do monorepo
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Gerar o cliente do Banco de Dados (Prisma)
npx prisma generate --schema=packages/database/prisma/schema.prisma

# 4. Sincronizar o banco de dados (Neon/PostgreSQL)
npx prisma db push --schema=packages/database/prisma/schema.prisma

# 5. Popular o banco com os +140 exercícios e vídeos
npx prisma db seed --schema=packages/database/prisma/schema.prisma

# 6. Iniciar o ambiente de desenvolvimento
npm run dev
```

## 8. Escalabilidade e Performance
- O sistema utiliza **Redis Cluster** para sessões e rankings.
- **BullMQ** gerencia o processamento assíncrono de vídeos e geração de IA.
- **Prisma** está configurado com pooling de conexões para suportar 1M+ de usuários.
