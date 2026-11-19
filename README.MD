# PROJECTAPI

### API REST para gerenciamento de usuários e produtos

![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-ORM-E83524)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens)
![bcrypt](https://img.shields.io/badge/bcrypt-Password_Security-blue)

O **PROJECTAPI** é uma API REST desenvolvida com Node.js e TypeScript, utilizando Express, TypeORM e MySQL. O sistema foi desenvolvido com foco em gerenciamento de dados, autenticação, segurança e organização de código.

Além das operações CRUD, a aplicação possui autenticação com JWT, criptografia de senhas com bcrypt, recuperação e redefinição de senha por e-mail, validação de credenciais e tokens, relacionamentos entre entidades e paginação de resultados.

---

## Sobre o projeto

O objetivo do PROJECTAPI é implementar uma estrutura Backend organizada, modular e reutilizável, oferecendo funcionalidades para gerenciamento de usuários e produtos.

O sistema contempla:

- Gerenciamento de usuários.
- Gerenciamento de situações de usuários.
- Gerenciamento de produtos.
- Gerenciamento de categorias de produtos.
- Gerenciamento de situações de produtos.
- Autenticação e autorização com JWT.
- Proteção de senhas com bcrypt.
- Recuperação e alteração de senhas.
- Envio de e-mails com Nodemailer.
- Validação de dados e credenciais.
- Paginação reutilizável.
- Versionamento do banco de dados com migrations.
- Inserção de dados iniciais com seeds.

## Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| [Node.js](https://nodejs.org/) | Ambiente de execução |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Express](https://expressjs.com/) | Framework para API REST |
| [TypeORM](https://typeorm.io/) | ORM e gerenciamento de entidades |
| [MySQL](https://www.mysql.com/) | Banco de dados relacional |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | Hash e proteção de senhas |
| [JWT](https://jwt.io/) | Autenticação baseada em tokens |
| [Nodemailer](https://nodemailer.com/) | Envio de e-mails |
| [Mailtrap](https://mailtrap.io/) | Serviço SMTP para e-mails |
| [Yup](https://github.com/jquense/yup) | Validação de dados |
| [dotenv](https://www.npmjs.com/package/dotenv) | Variáveis de ambiente |

## Funcionalidades

### Autenticação e segurança

- Autenticação de usuários utilizando JSON Web Token (JWT).
- Geração de tokens assinados com chave secreta.
- Middleware para validação de tokens.
- Proteção de rotas que exigem autenticação.
- Criptografia de senhas utilizando bcrypt.
- Validação de credenciais.
- Validação dos dados enviados nas requisições.

### Recuperação e troca de senha

O sistema possui um fluxo de recuperação de senha por e-mail.

Etapas do processo:

1. O usuário solicita a recuperação informando seu e-mail.
2. O sistema verifica a existência da conta.
3. Uma chave de recuperação é gerada e associada ao usuário.
4. O Nodemailer envia um e-mail com o link de recuperação.
5. O usuário acessa o link recebido.
6. O sistema valida o e-mail e a chave de recuperação.
7. Após a validação, o usuário pode cadastrar uma nova senha.
8. A nova senha é processada pelo bcrypt antes de ser armazenada.

O projeto diferencia o JWT de autenticação da chave utilizada para recuperação de senha, pois cada mecanismo possui uma finalidade específica.

### Gerenciamento de dados

| Recurso | Funcionalidades |
|---|---|
| Usuários | Cadastro, consulta, atualização, exclusão e paginação |
| Situações | Cadastro, consulta, atualização e exclusão |
| Produtos | Cadastro, consulta, atualização, exclusão e paginação |
| Categorias | Cadastro, consulta, atualização e exclusão |
| Situações de produtos | Cadastro, consulta, atualização e exclusão |

### Paginação

O projeto possui um serviço reutilizável chamado `PaginationService`, responsável por controlar a quantidade de registros retornados em cada consulta.

Parâmetros disponíveis:

- `page`: página solicitada.
- `limit`: quantidade de registros.
- `order`: ordenação dos resultados.
- `relations`: relacionamentos que devem ser carregados.

O serviço realiza validações para impedir páginas e limites inválidos.

## Arquitetura do projeto

A aplicação utiliza uma arquitetura modular, separando responsabilidades em controllers, entities, middlewares, migrations, seeds e services.

```text
PROJECTAPI/
│
├── src/
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   ├── ProductCategoriesController.ts
│   │   ├── ProductsController.ts
│   │   ├── ProductSituationsController.ts
│   │   ├── SituationsController.ts
│   │   ├── TestConnectionController.ts
│   │   └── UsersController.ts
│   │
│   ├── entity/
│   │   ├── ProductCategories.ts
│   │   ├── Products.ts
│   │   ├── ProductSituations.ts
│   │   ├── Situations.ts
│   │   └── Users.ts
│   │
│   ├── middlewares/
│   │   └── authMiddleware.ts
│   │
│   ├── migration/
│   │
│   ├── seeds/
│   │   ├── CreateProductsSeeds.ts
│   │   ├── CreateSituationsSeeds.ts
│   │   └── CreateUsersSeeds.ts
│   │
│   ├── services/
│   │   ├── AuthService.ts
│   │   └── PaginationService.ts
│   │
│   ├── data-source.ts
│   ├── index.ts
│   └── run-seeds.ts
│
├── .env
├── .env.exemple
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

### Responsabilidades

- **Controllers:** recebem requisições HTTP, executam operações e retornam respostas.
- **Entities:** representam as tabelas e os relacionamentos do banco de dados.
- **Middlewares:** executam verificações durante o processamento das requisições, incluindo autenticação.
- **Migrations:** controlam a evolução da estrutura do banco de dados.
- **Seeds:** inserem dados iniciais.
- **Services:** concentram funcionalidades reutilizáveis, como autenticação e paginação.

## Banco de dados

O projeto utiliza MySQL, com o banco de dados denominado `nodeapi`.

### Diagrama do banco de dados

Adicione o diagrama atualizado do banco de dados ao repositório e utilize o caminho abaixo para exibi-lo:

![Diagrama do banco de dados PROJECTAPI](docs/diagrama-banco.png)

### Tabelas

| Tabela | Descrição |
|---|---|
| `users` | Usuários e informações de autenticação |
| `situations` | Situações dos usuários |
| `products` | Produtos cadastrados |
| `product_categories` | Categorias dos produtos |
| `product_situations` | Situações dos produtos |
| `migrations` | Histórico de migrations do TypeORM |

### Relacionamentos

- Uma situação pode estar associada a vários usuários.
- Uma categoria pode possuir vários produtos.
- Uma situação pode estar associada a vários produtos.
- Cada produto possui uma categoria e uma situação.

Os relacionamentos são configurados por meio do TypeORM utilizando `ManyToOne`.

## Segurança

A segurança foi considerada uma parte importante do desenvolvimento da aplicação.

**bcrypt**
- Geração de hash para armazenamento de senhas.
- Comparação entre senha informada e hash armazenado.
- Proteção contra armazenamento de senhas em texto puro.

**JWT**
- Geração de tokens de autenticação.
- Validação de assinatura.
- Verificação da validade dos tokens.
- Proteção de rotas privadas por middleware.

**Recuperação de senha**
- Chave específica para recuperação.
- Validação da chave recebida.
- Verificação do e-mail associado à conta.
- Atualização da senha utilizando bcrypt.

**Variáveis de ambiente**
- Credenciais do banco de dados.
- Chave secreta do JWT.
- Credenciais SMTP.
- Configurações da aplicação.

As credenciais não devem ser publicadas no repositório.

## Instalação e execução

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- npm
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- Git

### 1. Clonar o repositório

```bash
git clone https://github.com/pedrolcsr/PROJECTAPI.git
```

### 2. Acessar a pasta

```bash
cd PROJECTAPI
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Criar o banco de dados

No MySQL, execute:

```sql
CREATE DATABASE nodeapi;
```

### 5. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
APP="Pedro Softwares"
PORT=8080

JWT_SECRET=sua_chave_secreta

EMAIL_ADM=admin@exemplo.com

DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=nodeapi

EMAIL_FROM=noreply@seudominio.com
EMAIL_HOST=live.smtp.mailtrap.io
EMAIL_PORT=587
EMAIL_USER=api
EMAIL_PASS=sua_senha_smtp
```

**Importante:** substitua os valores de exemplo pelas credenciais do seu ambiente. Nunca publique o arquivo `.env` no GitHub.

### 6. Compilar o projeto

```bash
npm run build
```

### 7. Executar migrations

```bash
npx typeorm migration:run -d dist/data-source.js
```

### 8. Executar seeds

```bash
node dist/run-seeds.js
```

### 9. Iniciar a aplicação

```bash
npm run start:watch
```

Servidor local:

```text
http://localhost:8080/
```

## Endpoints

Algumas rotas documentadas do projeto:

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/users` | Listagem paginada de usuários |
| GET | `/products` | Listagem paginada de produtos |
| GET | `/products/:id` | Consulta individual de produto |

A rota `/users` utiliza middleware de autenticação JWT.

### Exemplo de paginação

```http
GET /products?page=1&limit=10
```

As demais rotas e seus métodos podem ser consultados nos respectivos controllers.

## Migrations e Seeds

O TypeORM é utilizado para versionamento da estrutura do banco de dados.

Entre as alterações controladas pelas migrations estão:

- Criação das tabelas principais.
- Adição de campos de autenticação.
- Adição do campo `slug`.
- Adição do campo `price`.
- Adição do campo `recoverPassword`.

Os seeds são utilizados para popular as tabelas com dados iniciais, incluindo situações, usuários e produtos.

## Tratamento de erros

A aplicação utiliza tratamento de exceções com `try/catch` nos controllers.

Entre os cenários tratados estão:

- Registros não encontrados.
- Dados inválidos.
- Tokens ausentes ou inválidos.
- Falhas de autenticação.
- Erros de validação.
- Problemas de comunicação com o banco.
- Falhas no envio de e-mails.
- Erros relacionados à recuperação de senha.

## Autor

**Pedro Lucas Ramos Pereira**

Estudante de Engenharia de Software, com foco em desenvolvimento Backend.

- **GitHub:** [pedrolcsr](https://github.com/pedrolcsr)
- **Repositório:** [PROJECTAPI](https://github.com/pedrolcsr/PROJECTAPI)

---

Desenvolvido com Node.js, TypeScript, Express, TypeORM e MySQL.

**PROJECTAPI — Desenvolvimento Backend.**
