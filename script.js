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

    // Evento de alteração da opção de classificação
    sortBySelect.addEventListener('change', function() {
        renderBookList();
    });

    // Função para exibir os elementos da lista de livros
    function showBookListElements() {
        bookListContainer.style.display = 'block'; // Exibe o container da lista de livros
        document.querySelector('h2.listagem').style.display = 'block'; // Exibe o título da lista
        document.querySelector('p').style.display = 'block'; // Exibe a mensagem de instrução
    }

    // Função para renderizar a lista de livros
    function renderBookList() {
        const sortBy = sortBySelect.value; // Obtém a opção de classificação selecionada
        let sortedBooks = [...books]; // Cria uma cópia do array de livros

        // Ordena os livros com base na opção de classificação selecionada
        if (sortBy === 'title') {
            sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'publication-date') {
            sortedBooks.sort((a, b) => new Date(a.publicationDate) - new Date(b.publicationDate));
        }

        const bookListBody = document.getElementById('book-list-body');
        bookListBody.innerHTML = '';
