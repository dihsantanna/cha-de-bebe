
# Chá de Bebê

Aplicação Next, construída para gerenciamento da lista de cha de bebê do meu filho Rafael. O front e o backend estão unificados pelo next por questões de comodidade e dinamismo e isso não reflete a usabilidade padrão.



## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar renomear o arquivo .env.example para .env, e preencher as variaveis corretamente.
Estou utilizando como banco de dados o [Vercel Postgres](https://postgres-starter.vercel.app/), mas você pode configurar outro banco de sua preferencia. Porque não utilizar docker! :wink:


## Stack utilizada

**Front-end:**
- Next.js
- TailwindCSS
- Nookies
- Axios

**Back-end:**
- Next.js
- Prisma
- JWT
- MD5
- Postgres

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:dihsantanna/cha-de-bebe.git
```

Entre no diretório do projeto

```bash
  cd cha-de-bebe
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

*_lembre-se de que é necessário preencher as variáveis de ambiente no arquivo `.env`._

## Documentação

Para o futuro, pretendo documentar os componentes com `Storybook` e as rotas da API com `Swagger`.

