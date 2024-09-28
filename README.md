# MyApp - Gerenciamento de Usuários

### Descrição

O **MyApp** é um aplicativo de gerenciamento de usuários desenvolvido em **React Native**. O app permite realizar o cadastro, busca, e edição de usuários, com uma interface simples e intuitiva. A seleção de cidades é feita através de um menu dropdown (Picker), utilizando a biblioteca `@react-native-picker/picker`. Além disso, o app realiza requisições HTTP usando **axios** para se comunicar com uma API.

### Funcionalidades

- **Cadastro de usuários:** O app permite adicionar novos usuários com as informações:
  - Nome
  - Email
  - Login
  - Senha
  - Cidade (selecionada de um menu dropdown)
  
- **Busca de usuários:** Com uma caixa de pesquisa, o usuário pode filtrar e encontrar usuários cadastrados pelo nome.

- **Edição de usuários:** Após selecionar um usuário, é possível editar suas informações diretamente.

- **Seleção de cidade:** O campo de cidade utiliza um **Picker** para facilitar a seleção de opções predefinidas, como "Santa Maria", "Porto Alegre", entre outras.

### Tecnologias Utilizadas

- **React Native:** Framework principal para o desenvolvimento do aplicativo.
- **Axios:** Biblioteca usada para realizar as requisições HTTP para o backend.
- **@react-native-picker/picker:** Biblioteca utilizada para criar o seletor de cidades no campo de formulário.
- **JavaScript/TypeScript:** Linguagem de programação utilizada no desenvolvimento do app.

### Estrutura Básica do Projeto

- **Tela de Cadastro:** Permite adicionar novos usuários com campos validados. Usa `axios` para enviar os dados para a API.
- **Tela de Listagem e Edição de Usuários:** Exibe uma lista de usuários cadastrados e permite selecionar um usuário para editar suas informações. Inclui uma caixa de pesquisa para filtrar os resultados.
- **Tela de Detalhes do Usuário:** Exibe detalhes como nome, email, login e cidade, além de permitir a edição.

### Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/myapp.git
