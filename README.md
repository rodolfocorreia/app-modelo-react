# App Modelo React

Projeto full stack com backend em NestJS, banco MySQL e frontend em React com Vite. A aplicacao possui autenticacao por JWT, cadastro/consulta de usuarios na API e uma interface web com login, menu lateral, tema claro/escuro e paginas protegidas.

## Estrutura do projeto

```text
app-modelo-react/
  api/   Backend NestJS com TypeORM, JWT, Swagger e MySQL
  app/   Frontend React + TypeScript + Vite + PrimeReact
```

## Como funciona

O backend expoe uma API REST na porta `3000`. Todas as rotas da aplicacao usam o prefixo `/api`, exceto a documentacao Swagger, que fica em `/docs`.

O frontend roda separado, normalmente na porta do Vite, e consome a API em `http://localhost:3000/api`. Quando o usuario faz login, o token JWT retornado pela API e salvo no `localStorage`. As proximas requisicoes usam esse token no header `Authorization: Bearer <token>`.

Ao abrir o app, o React verifica se existe um token salvo. Se existir, chama `GET /api/auth/me` para confirmar se a sessao ainda e valida. Caso o token seja invalido ou expire, o app remove os dados locais e redireciona para `/login`.

## Tecnologias principais

- Backend: NestJS, TypeScript, TypeORM, Passport, JWT, bcrypt, Swagger
- Banco de dados: MySQL
- Frontend: React, TypeScript, Vite, React Router, Axios, PrimeReact, PrimeIcons

## Requisitos

- Node.js instalado
- npm instalado
- MySQL rodando localmente ou acessivel pela rede

## Banco de dados

O arquivo [api/init.sql](api/init.sql) cria o banco `app_modelo_react` e as tabelas:

- `tb_cad_usuario`: usuarios cadastrados
- `token`: token atual associado ao email do usuario

Para preparar o banco manualmente, execute o script no MySQL:

```bash
mysql -u seu_usuario -p < api/init.sql
```

Por padrao, a API tenta conectar com:

```text
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=app_modelo_react
```

Esses valores podem ser alterados por variaveis de ambiente.

## Variaveis de ambiente da API

```text
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=app_modelo_react
TYPEORM_SYNCHRONIZE=false
JWT_SECRET=minha-api-e-segura-top
JWT_EXPIRES_IN=8h
```

Observacao: em desenvolvimento, `TYPEORM_SYNCHRONIZE=true` permite que o TypeORM sincronize as entidades com o banco. Em geral, para manter o controle do schema, prefira usar o `init.sql`.

## Como rodar o backend

Entre na pasta da API:

```bash
cd api
```

Instale as dependencias:

```bash
npm install
```

Inicie em modo desenvolvimento:

```bash
npm run start:dev
```

A API ficara disponivel em:

```text
http://localhost:3000/api
```

A documentacao Swagger ficara em:

```text
http://localhost:3000/docs
```

## Como rodar o frontend

Em outro terminal, entre na pasta do app:

```bash
cd app
```

Instale as dependencias:

```bash
npm install
```

Inicie o Vite:

```bash
npm run dev
```

Abra a URL exibida no terminal, normalmente:

```text
http://localhost:5173
```

## Fluxo basico de uso

1. Rode o MySQL e prepare o banco com `api/init.sql`.
2. Rode a API com `npm run start:dev` dentro de `api`.
3. Rode o frontend com `npm run dev` dentro de `app`.
4. Cadastre um usuario pela API em `POST /api/usuarios`.
5. Acesse o frontend e faca login usando o email e a senha cadastrados.

Exemplo de corpo para cadastro:

```json
{
  "nome": "Joao da Silva",
  "usuario": "joao.silva",
  "email": "joao@email.com",
  "senha": "senha123",
  "endereco": "Rua das Flores, 100",
  "telefone": "11999999999"
}
```

## Rotas principais da API

### Autenticacao

- `POST /api/auth/login`: autentica o usuario e retorna um token JWT
- `GET /api/auth/me`: retorna o usuario autenticado pelo token
- `POST /api/token/refresh`: gera um novo token a partir de um token anterior salvo

### Usuarios

- `POST /api/usuarios`: cadastra um novo usuario
- `GET /api/usuarios`: lista todos os usuarios, exige JWT
- `GET /api/usuarios/:codigo`: busca um usuario pelo codigo, exige JWT
- `PATCH /api/usuarios/:codigo/ativo`: altera o status ativo do usuario, exige JWT
- `DELETE /api/usuarios/:codigo`: remove um usuario, exige JWT

## Telas do frontend

- `/login`: tela de autenticacao
- `/`: tela inicial protegida
- `/clientes`: pagina de clientes, atualmente com conteudo inicial de teste

O componente `Header` possui botao de menu lateral, alternancia de tema claro/escuro e logout. O `Sidebar` mostra opcoes de navegacao e dados do usuario salvo no `localStorage`.

## Scripts uteis

### API

```bash
npm run start:dev
npm run build
npm run lint
npm run test
npm run test:e2e
```

### App

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Observacoes de desenvolvimento

- O frontend usa `axios` em [app/src/services/api.ts](app/src/services/api.ts) com `baseURL` fixa em `http://localhost:3000/api`.
- A API habilita CORS no bootstrap para permitir chamadas do frontend local.
- As senhas sao armazenadas com hash bcrypt.
- A maioria das rotas de usuario exige JWT, mas o cadastro de usuario e publico para permitir criar o primeiro acesso.
- O token tem expiracao padrao de `8h`, configuravel por `JWT_EXPIRES_IN`.
