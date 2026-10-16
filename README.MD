# PROJECTAPI

API REST desenvolvida com **Node.js, TypeScript, Express, TypeORM e MySQL**, com foco em operações CRUD, relacionamentos entre entidades, paginação e organização em camadas.

O projeto permite gerenciar situações gerais, categorias de produtos, situações de produtos e produtos, utilizando migrations para controlar a estrutura do banco de dados.

## Tecnologias utilizadas

- **Node.js** — ambiente de execução JavaScript.
- **TypeScript** — tipagem estática e desenvolvimento mais seguro.
- **Express.js** — criação e gerenciamento das rotas HTTP.
- **TypeORM** — ORM para mapeamento de entidades e acesso ao banco de dados.
- **MySQL 8** — banco de dados relacional.
- **dotenv** — carregamento de variáveis de ambiente.
- **reflect-metadata** — suporte aos metadados utilizados pelo TypeORM.
- **Postman** — testes manuais dos endpoints REST.
- **MySQL Workbench** — gerenciamento visual do banco de dados.
- **Git e GitHub** — controle de versão e hospedagem do código.

## Funcionalidades

- CRUD de situações gerais.
- CRUD de categorias de produtos.
- CRUD de situações de produtos.
- CRUD de produtos.
- Paginação de listagens com parâmetros configuráveis.
- Validação de IDs e campos obrigatórios.
- Tratamento de erros e respostas HTTP.
- Relacionamentos entre produtos, categorias e situações.
- Migrations para criação e versionamento das tabelas.
- Configuração da conexão com o banco por variáveis de ambiente.

## Estrutura do projeto

```text
PROJECTAPI/
├── src/
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   ├── SituationsController.ts
│   │   ├── ProductCategoriesController.ts
│   │   ├── ProductSituationsController.ts
│   │   └── ProductsController.ts
│   ├── entity/
│   │   ├── Users.ts
│   │   ├── Situations.ts
│   │   ├── ProductCategories.ts
│   │   ├── ProductSituations.ts
│   │   └── Products.ts
│   ├── migration/
│   ├── seeds/
│   ├── services/
│   │   └── PaginationService.ts
│   ├── data-source.ts
│   ├── index.ts
│   └── run-seeds.ts
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

> A estrutura representa a organização utilizada no projeto. Confirme os nomes dos arquivos existentes antes de publicar o README, especialmente os controllers de produtos.

## Requisitos

Antes de executar o projeto, instale:

- Node.js e npm.
- MySQL Server 8.
- Git.
- Postman (opcional, para testar as requisições).

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/pedrolcsr/PROJECTAPI.git
```

### 2. Acesse a pasta

```bash
cd PROJECTAPI
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o banco de dados

Crie o banco no MySQL:

```sql
CREATE DATABASE nodeapi;
```

Crie um arquivo `.env` na raiz do projeto e configure as variáveis conforme sua instalação:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nodeapi
PORT=8080
```

**Importante:** substitua `seu_usuario` e `sua_senha` pelas credenciais do seu MySQL. Não publique suas credenciais no GitHub.

## Executando o projeto

### Compilar o TypeScript

```bash
npm run build
```

Esse comando compila os arquivos TypeScript conforme as configurações do `tsconfig.json`, gerando os arquivos JavaScript de saída.

### Executar as migrations

Após configurar o banco de dados e compilar o projeto:

```bash
npx typeorm migration:show -d dist/data-source.js
```

O comando acima lista as migrations e indica quais já foram executadas.

Para executar as migrations pendentes:

```bash
npx typeorm migration:run -d dist/data-source.js
```

As migrations são responsáveis por criar as tabelas e os relacionamentos definidos no projeto.

### Iniciar a API

```bash
npm run start:watch
```

Por padrão, a API está configurada para utilizar a porta `8080`, conforme a variável `PORT` do arquivo `.env`.

Endereço local:

```text
http://localhost:8080
```

## Endpoints da API

Todos os endpoints abaixo utilizam o endereço-base `http://localhost:8080`.

### Situações gerais

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/situations` | Lista situações com paginação |
| GET | `/situations/:id` | Consulta uma situação |
| POST | `/situations` | Cadastra uma situação |
| PUT | `/situations/:id` | Atualiza uma situação |
| DELETE | `/situations/:id` | Exclui uma situação |

Exemplo de cadastro:

```json
{
  "nameSituation": "Ativo"
}
```

### Categorias de produtos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/product-categories` | Lista categorias |
| GET | `/product-categories/:id` | Consulta uma categoria |
| POST | `/product-categories` | Cadastra uma categoria |
| PUT | `/product-categories/:id` | Atualiza uma categoria |
| DELETE | `/product-categories/:id` | Exclui uma categoria |

Exemplo de cadastro:

```json
{
  "name": "Periféricos"
}
```

### Situações de produtos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/product-situations` | Lista situações de produtos |
| GET | `/product-situations/:id` | Consulta uma situação |
| POST | `/product-situations` | Cadastra uma situação |
| PUT | `/product-situations/:id` | Atualiza uma situação |
| DELETE | `/product-situations/:id` | Exclui uma situação |

Exemplo de cadastro:

```json
{
  "name": "Disponível"
}
```

### Produtos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/products` | Lista produtos com paginação |
| GET | `/products/:id` | Consulta um produto |
| POST | `/products` | Cadastra um produto |
| PUT | `/products/:id` | Atualiza um produto |
| DELETE | `/products/:id` | Exclui um produto |

Exemplo de cadastro:

```json
{
  "name": "Teclado mecânico",
  "productCategoryId": 1,
  "productSituationId": 1
}
```

Os IDs de categoria e situação devem corresponder a registros existentes no banco de dados.

## Paginação

Os endpoints de listagem aceitam os parâmetros `page` e `limit`.

Exemplo:

```http
GET /products?page=1&limit=10
```

- `page`: número da página, começando em 1.
- `limit`: quantidade de registros por página, de 1 a 100.

A resposta inclui os dados retornados, a página atual, a última página e o total de registros.

## Banco de dados e migrations

O banco de dados utiliza as seguintes tabelas principais:

- `users` — usuários.
- `situations` — situações gerais.
- `product_categories` — categorias dos produtos.
- `product_situations` — situações dos produtos.
- `products` — produtos cadastrados.
- `migrations` — histórico de migrations executadas pelo TypeORM.

A tabela `products` possui chaves estrangeiras para `product_categories` e `product_situations`, mantendo a integridade referencial.

O projeto utiliza `synchronize: false`, deixando a evolução do esquema sob controle das migrations.

## Testes

Os endpoints foram testados manualmente utilizando o Postman, incluindo operações de criação, listagem, consulta, atualização e exclusão.

Também foram realizadas verificações de compilação TypeScript e de execução das migrations.

Para reproduzir os testes, configure o banco, execute as migrations e inicie a API antes de enviar as requisições.

## Boas práticas adotadas

- Separação entre controllers, entidades, serviços e migrations.
- Validação de parâmetros e campos obrigatórios.
- Uso de variáveis de ambiente para configuração.
- Tratamento de erros com códigos de status HTTP.
- Paginação para listagens.
- Relacionamentos entre entidades com chaves estrangeiras.
- Controle de versão do esquema por migrations.

## Aprendizados

Este projeto foi desenvolvido para praticar conceitos fundamentais de desenvolvimento backend, incluindo APIs REST, TypeScript, ORM, modelagem relacional, migrations, validação de dados, paginação e testes de endpoints.

## Autor

**Pedro Lucas Ramos Pereira**

- GitHub: [@pedrolcsr](https://github.com/pedrolcsr)
- LinkedIn: [Pedro Lucas Ramos Pereira](https://www.linkedin.com/in/SEU-USUARIO/)
