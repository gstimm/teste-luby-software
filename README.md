# API Node para teste Back-end na Luby Software.

Uma API RESTful feita com Node.js, PostgreSQL, Express e Sequelize.

## Exercícios de Lógica encontram-se na pasta: "teste-lógica".

Para executá-los, abra o `index.html` no navegador e basta escolher a função que deseja executar. A resposta de cada função será retornada no `console de desenvolvedor` do navegador.

## Como rodar a API:

1. Instale o [Node.JS](https://nodejs.org/en/) na versão LTS;
2. Instale o Yarn com o comando: `npm install -g yarn`;
3. Instale o PostgresSQL através do docker.
4. Com o docker instalado será necessário criar um container, para isso devemos digitar no terminal:
`docker run --name user_name -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres`
o retorno será a ID do container caso o comando tenha sucesso;
5. Em seguida, será necessário iniciar o container com o comando: `docker start ID_do_container`;
6. Com o container criado, o proximo passo é criar o banco de dados. Isso pode ser feito através de um software de sua escolha, recomendo o [Postbird](https://www.electronjs.org/apps/postbird), ou com o camando `yarn sequelize db:create`. Guarde os dados usados para criar o banco, pois eles serão utilizados no `.env`.
7. Clone o repositório e altere o nome do arquivo `.env.example` para `.env` na raiz do projeto;
8. No arquivo `.env`, complete os dados necessários conforme os dados usados na criação do banco.
9. Na pasta do projeto, instale as dependências utilizando o comando `yarn`;
10. Vamos rodar as migrações para deixar o banco de dados no formato correto, digite no console:
 `yarn sequelize db:migrate` e todas as migrações devem ser executadas moldando o formato do banco de dados.
11. Inicie a API digitando no console: `yarn dev`;
12. Utilize o [Insomnia](https://insomnia.rest/download) para testar a aplicação.

## Template do Insomnia para testar:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=API%20Luby%20Software%20Gabriel%20Timm&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fgstimm%2Fteste-luby-software%2Fmain%2FInsomnia_2021-04-30)

## Endpoints:

### Para testar as rotas que necessitam de autenticação, efetue Login e copie o Token gerado. Precione `ctrl + E` e preencha o campo de token.

### GET

`/users/index` Rota para listar todos os Users. (Index) <br/>
`/users/show/:id` Rota para detalhar um User. (Show) <br/>

`/repositories/index` Rota para listar todos os Repositórios. (Index) <br/>
`/repositories/show/:repository_id` Rota para detalhar um Repositório. (Show) <br/>


### POST

`/users/store` Rota para criar um novo User. (Store) <br/>
`/users/login` Rota para efetuar Login do User. (Store) <br/>

`/repositories/store` Rota para criar um novo Repositório. (Store) <br/>


### PUT

`/users/update` Rota para editar um User. (Update) <br/>

`/repositories/update/:repository_id` Rota para editar um Repositório. (Update) <br/>


### PATCH

`/users/follow/:followed_id` Rota para dar follow/unfollow em um User. (Update) <br/>

`/repositories/star/:repository_id` Rota para dar star/unstar em um Repositório. (Update) <br/>


### DELETE

`/users/delete` Rota para excluir um User. (Delete) <br/>

`/repositories/delete/:repository_id` Rota para excluir um Repositório. (Delete) <br/>

