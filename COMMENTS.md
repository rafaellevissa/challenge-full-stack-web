**Decisão da arquitetura utilizada:**

- Utilizaremos banco de dados mysql
- Docker para containerizar aplicação
- Docker-compose para levantar a stack em ambiente de dev
- Utilizei o Gitlab para armazenar o código fonte para poder configurar o deploy contínuo, pois não sei configurar no github.
- Fiz uma API Rest que retorna e consome Json para o front
- Para automação da infraestrutura criei um script yml que roda um pipeline no gitlab, cria uma imagem docker no registry, conecta via ssh em uma instância AWS, faz as conexões, sobe um container baseado na imagem e disponibiliza o serviço nas portas correspondentes.
- Para banco de dados utilizamos o serviço RDS da AWS e as credenciais estão em variáveis de ambiente do GItlab

**Lista de bibliotecas de terceiros utilizadas:**

- `dotenv`: para gerenciar arquivos para variável de ambiente
- `express`: web framework
- `knex`: para gerenciar migrations e conexãoes com banco
- `mysql2`: para conexão com Mysql
- `swagger-ui-express`: para documentação da API

**O que você melhoraria se tivesse mais tempo:**

- Segurança de acesso a API
- Autenticações de e-mail e CPF
- autenticacao  JWT
- validacao dos campos a serem enviados
- A substituicao do javascript pelo typescript no back-end

**Quais requisitos obrigatórios que não foram entregues:**

- Testes unitários

**deploy:**

- Back rodando em:
http://grupoa.campusmaker.tech:83

- Front rodando em:
http://grupoa.campusmaker.tech:84