# Rádio Browser Challenge

This is a challenge by Coodesh

https://radio-browser-challenge.vercel.app/

Este projeto é um desafio de Front-end que utiliza Next.js e consome a API pública Radio Browser para criar uma aplicação de rádios online. A aplicação permite aos usuários buscar, adicionar e gerenciar rádios, proporcionando uma experiência nostálgica ao ouvir estações de todo o mundo.

## Linguagens, Frameworks e Tecnologias utilizadas:

- Next.js
- TypeScript
- React Query
- Axios
- TailwindCSS
- Docker

### Estrutura do Diretório

- **`public/`**: Contém arquivos estáticos e globais, incluindo imagens utilizadas na aplicação.
- **`src/`**: Contém o código-fonte da aplicação.
- **`app/`**: Componentes e páginas da aplicação.
- **`components/`**: Componentes da aplicação.

  - **`buttons/`**: Contém os componentes de buttons da aplicação.
  - `back-button.tsx`: Componente de botão que retorna à página anterior e redefine a seleção da rádio.
  - `favorite-button.tsx`: Componente de botão que permite adicionar ou remover rádios da lista de favoritos.

  - **`header/`**: Componente de cabeçalho que fornece navegação entre as páginas de Rádios e Favoritos.

  - **`players/`**: Componentes de players de áudio.
  - `audio-player/`: Componente de player de áudio para telas maiores que reproduz uma estação de rádio e exibe um sinal de "no signal" caso a transmissão não esteja disponível.
  - `mobile-audio-player/`: Componente de player de áudio para telas menores que reproduz uma estação de rádio e exibe um sinal de "no signal" caso a transmissão não esteja disponível.

  - **`providers`**: Componente que encapsula provedores de contexto para gerenciar estado de favoritos, edição de rádios e controle de áudio, utilizando o React Query para gerenciamento de dados assíncronos.

  - **`radio/`**: Contém componentes relacionados à exibição, edição e busca de estações de rádio.
  - `favorite-radios/`: Componente que exibe as rádios favoritas.
  - `radio-edit`: Componente que permite editar as informações de uma rádio.
  - `radio-item/`: Componente que exibe informações de uma rádio.
  - `radio-list`: Componente que lista estações de rádio.
  - `radio-search/`: Componente que permite a busca por estações de rádio através de um campo de entrada para nome, país ou idioma.

- **`context/`**: Contém componentes relacionados à exibição, edição e busca de estações de rádio.
- `audio-context.tsx`: Contexto que gerencia o estado do áudio atual do player de áudio em toda a aplicação.
- `edit-context.tsx`: Contexto que gerencia a edição de estações de rádio, permitindo atualizar e persistir as alterações.
- `favorite-context.tsx`: Contexto que gerencia as estações de rádio favoritas, permitindo adicionar ou remover rádios da lista.

- **`favorites/page.tsx`**: Página que exibe as estações de rádio favoritas, permitindo navegar entre elas e visualizar detalhes de cada rádio selecionada.

- **`services/`**: Contém funções e hooks responsáveis por gerenciar a comunicação com a API de estações de rádio.
- `api.ts`: Função que realiza requisições para obter estações de rádio da API.
- `radio-service.ts`: Hook que facilita a busca e o armazenamento em cache das estações de rádio.

- **`types/types.ts`**: Define tipos e propriedades utilizados para as rádios.

- **`page.tsx`**: Página inicial que integra os componentes de busca e lista de estações de rádio.

## Docker

- Dockerfile: Define a configuração para o container do frontend.
- docker-compose.yml na raiz do projeto: Orquestra o container para o frontend.

Para usar o projeto, clone o repositório, navegue até o diretório do frontend e execute docker-compose up --build para iniciar o aplicativo em http://localhost:3000.

### Instalação e Execução

Para rodar o frontend localmente, siga os passos abaixo:

1. **Instalar as dependências**:

```bash
cd radio-browser-challenge
npm install
```

2. **Executar o aplicativo**:

   ```bash
   npm run dev
   ```

   Isso iniciará o servidor de desenvolvimento em `http://localhost:3000`.

## Imagens do Projeto:

![mobile-radio](https://github.com/user-attachments/assets/e25d5009-4f88-4b30-89d2-72027e3d7bbd)
![Screenshot 2024-10-07 173657](https://github.com/user-attachments/assets/b523a6c7-7dcb-41a3-88dd-f001cfce647e)
![Screenshot 2024-10-07 173446](https://github.com/user-attachments/assets/b678400b-e663-408e-b219-35510dfd7518)
