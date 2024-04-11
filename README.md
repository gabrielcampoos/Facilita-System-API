- DEFINIÇÃO DAS ENVS
  PORT = Porta para rodar a API.

  DB_URL = URL do banco de dados.
  DB_TEST_URL = URL do banco de dados teste.  
   REDIS_URL = URL do redis.

  NODE_ENV = Ambiente, 'test' para ambiente de teste, 'production' para produção.

  JWT_SECRET = Definição de uma chave secreta.
  JWT_EXPIREIN = Definição do tempo em que expira o token.
  BCRYPT_SALT = Definição do salt aleatório.

- COMANDOS DE INSTALAÇÃO.
  yarn = instalar dependências.

- BUILD DA IMAGEM.
  docker-compose up -d.

- COMANDO PARA RODAR A APLICAÇÃO.
  yarn dev
