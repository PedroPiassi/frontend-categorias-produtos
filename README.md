# Projeto: Gestão de Categorias e Produtos

Esta aplicação web consiste em um crud de Categorias e Produtos

## Funcionalidades

1. **Gestão de Categorias**

   - Usuários podem criar, alterar, listar e deletar Categorias.

2. **Gestão de Produtos**

   - Usuários podem criar, alterar, listar e deletar Produtos.
     - Ao cadastrar um Produto o usuário deve vinculá-lo a uma categoria.

### Como rodar o frontend - Passo a passo

Clone o Repositório

```sh
git clone https://github.com/PedroPiassi/frontend-categorias-produtos.git
```

Abra a pasta que você clonou o projeto.

Tire o .example do .env.exemple, para que fiue apenas .env.

```sh
.env.example => .env
```

Rode o comando a baixo no terminal para subir o container do projeto

Observação: você precisa ter o docker instalado em sua máquina.

```sh
docker-compose up -d
```

Acesse o website em:
```sh
http://localhost:3000
```
