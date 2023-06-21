document.addEventListener('DOMContentLoaded', function() {
    // Obtém referências aos elementos do DOM
    const form = document.getElementById('book-form'); // Formulário para adicionar novos livros
    const bookListContainer = document.getElementById('book-list-container'); // Container da lista de livros
    const sortBySelect = document.getElementById('sort-by'); // Selecionar opção de classificação

    let books = []; // Array para armazenar os livros

    // Evento de envio do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtém os valores dos campos de entrada
        const titleInput = document.getElementById('title');
        const authorInput = document.getElementById('author');
        const publicationDateInput = document.getElementById('publication-date');

        // Cria um novo objeto de livro com os valores dos campos de entrada
        const newBook = {
            title: titleInput.value,
            author: authorInput.value,
            publicationDate: publicationDateInput.value
        };

        // Adiciona o novo livro ao array de livros
        books.push(newBook);

        // Se for o primeiro livro adicionado, exibe os elementos da lista de livros
        if (books.length === 1) {
            showBookListElements();
        }

        // Renderiza a lista de livros novamente e reseta o formulário
        renderBookList();
        form.reset();
    });