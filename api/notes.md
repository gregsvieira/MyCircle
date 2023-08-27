# Sigleton - Design Pattern
  Só uma instancia dos objetos dentro da nossa aplicação. Então deve-se utilizaar a mesma instância. Sempre que for importado será importado a classe que foi gerada em memória.
  Visto em controller/ContactController.

# Repository Pattern
  Layer(camada) de abstração de acesso ao Data Source

  Request <-> Middlewares -> Controller -> Repository -> Data Source -> Response

# Middlewares
  São "meio-do-caminho" nas rotas. O express executa um seguido do outro, então se precisa ter cuidado com a execução destes.


# Requests
  Origem: protocolo:://domínio:porta
  Saída: http://localhost:3000
    protocolo: http
    domínio: localhost
    porta: 3000

  # SOP -> Same Origin Policy -> Política de mesma origem
    Feita pela mesma origem da entrada e saída
    Saída: http://localhost:3000
    Entrada: http://localhost:3000

  # CORS -> Cross-Origin Resource Sharing -> Compartilhamento entre origens diferentes
    Feita por uma origem de saída diferente da entrada
    Saída: http://localhost:3000
    Entrada: http://localhost:3001

    Simple Requets
    https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests
    Permite ser dos métodos: GET, HEAD, POST.
    Permite ter somente os headers:
      Accept, Accept-Language, Content-Language, Content-Type (please note the additional requirements below), Range
      Permite ter somente o Content-Type do tipo:
        application/x-www-form-urlencoded,
        multipart/form-data,
        text/plain

    Preflight -> Pré-voô
      Diferente da Simple Requets permite especificar os outros métodos:
      Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE
      Access-Control-Allow-Methods: * (todos)
      Permite headers diferentes: Como controle de cache pelos navegadores: Access-Control-Max-Age
