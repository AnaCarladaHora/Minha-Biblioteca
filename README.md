# Minha Biblioteca Pessoal

Este é um aplicativo web para gerenciar sua biblioteca pessoal. Ele permite que você cadastre livros, defina metas de leitura, acompanhe seu progresso e organize seus livros.

## Funcionalidades

*   **Autenticação:** Login e criação de nova conta para usuários.
*   **Dashboard:** Exibe um resumo da sua biblioteca e o total de páginas lidas no dia.
*   **Listagem de Livros:** Permite cadastrar livros com título, autor, capa (URL), categoria, comentários e avaliação com estrelas.
*   **Edição de Livros:** Permite editar as informações de livros existentes.
*   **Metas de Leitura:** Você pode adicionar metas de leitura com um título, descrição, data de conclusão e status.
*  **Edição de Metas:** Permite editar as informações de metas existentes.
*   **Leitura Diária:** Permite registrar as páginas lidas por dia e exibir o histórico.
*   **Filtros:** Permite dividir a listagem de livros por categorias como "Lendo", "Lido" ou "Meta de Leitura".

## Tecnologias Utilizadas

*   **Frontend:**
    *   HTML
    *   CSS
    *   JavaScript
    *   Bootstrap (para layout responsivo)
    *  Font Awesome (para ícones)
*   **Backend:**
    *   Node.js
    *   Express
    *   SQLite (para o banco de dados)

## Como usar

1.  **Clonar o Repositório:**

    ```bash
    git clone https://github.com/<seu-usuario>/<nome-do-repositorio>.git
    cd <nome-do-repositorio>
    ```

2.  **Executar o backend:**

    ```bash
      npm install
      node server.js
    ```
3.  **Acesse o front-end:** Abra o arquivo `index.html` no seu navegador através do seu editor de código, por exemplo com o `live server` do `vscode` ou com `http-server`

4.  **Configuração:**

    *   Faça login ou crie uma nova conta.
    *   Você poderá adicionar livros, configurar metas de leitura e registrar páginas lidas diariamente.

## Notas

*   Os dados dos usuários são persistidos no banco de dados SQLite, os livros, metas e paginas lidas são salvas no localstorage.
*  O Localstorage do navegador é usado para persistir os dados do front end.

## Próximos Passos

1.  **Backend Completo:** Implementar o restante das funcionalidades no backend.
2.  **Autenticação:** Implementar um sistema de autenticação mais seguro.
3.  **Banco de Dados:** Usar um banco de dados mais robusto como PostgreSQL, MySQL ou MongoDB.
4.  **Testes:** Adicionar testes automatizados para garantir a qualidade do código.
5.  **Melhorias UI/UX:** Adicionar mais feedback ao usuário.

## Como contribuir

Contribuições são muito bem-vindas! Se você tiver alguma ideia de melhoria, correções de bugs, ou novas funcionalidades, sinta-se à vontade para:

1.  **Criar um Fork:** Faça um fork do projeto para sua conta.
2.  **Criar um branch:** Crie um branch para sua alteração (ex: `git checkout -b minha-alteracao`).
3.  **Fazer suas modificações:** Faça as modificações e melhorias.
4.  **Submeter um Pull Request:** Envie um pull request para que suas alterações sejam consideradas.

## Autor

[Seu Nome]

[Seu GitHub](https://github.com/<seu-usuario>)

## Licença

Este projeto está sob a licença [MIT License] (https://opensource.org/licenses/MIT).
