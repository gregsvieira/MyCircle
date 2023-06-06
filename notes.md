# Sigleton - Design Pattern
  Só uma instancia dos objetos dentro da nossa aplicação. Então deve-se utilizaar a mesma instância. Sempre que for importado será importado a classe que foi gerada em memória.
  Visto em controller/ContactController.

# Repository Pattern
Layer(camada) de abstração de acesso ao Data Source

Request <-> Middlewares -> Controller -> Repository -> Data Source -> Response

# Middlewares
São "meio-do-caminho" nas rotas. O express executa um seguido do outro, então se precisa ter cuidado com a execução destes.
