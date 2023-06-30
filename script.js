// Capturar elementos do formulário e da lista de livros
const bookForm = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const publicationDateInput = document.getElementById('publication-date');
const bookList = document.getElementById('book-list-body');
const nullMessage = document.getElementById('null');

  const library = []; // Array para armazenar os livros

  // Evento de envio do formulário
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtém os valores dos campos de entrada
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const publicationDateInput = document.getElementById("publication-date");

    // Cria um novo objeto de livro com os valores dos campos de entrada
    const newBook = {
      title: titleInput.value,
      author: authorInput.value,
      publicationDate: publicationDateInput.value,
    };

    // Adiciona o novo livro ao array de livros
    library.push(newBook);

    // Se for o primeiro livro adicionado, exibe os elementos da lista de livros
    if (library.length === 1) {
      showBookListElements();
    }

    // Renderiza a lista de livros novamente e reseta o formulário
    renderBookList();
    localStorage.setItem("books", JSON.stringify(library));
    form.reset();
  });

  // Evento de alteração da opção de classificação
  sortBySelect.addEventListener("change", function () {
    renderBookList();
  });

  // Função para exibir os elementos da lista de livros
  function showBookListElements() {
    bookListContainer.style.display = "block"; // Exibe o container da lista de livros
    document.querySelector("h2.listagem").style.display = "block"; // Exibe o título da lista
    document.querySelector("p").style.display = "block"; // Exibe a mensagem de instrução
  }

  // Função para renderizar a lista de livros
  function renderBookList() {
    const sortBy = sortBySelect.value; // Obtém a opção de classificação selecionada
    let sortedBooks = [...library]; // Cria uma cópia do array de livros

    // Ordena os livros com base na opção de classificação selecionada
    if (sortBy === "title") {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "publication-date") {
      sortedBooks.sort(
        (a, b) => new Date(a.publicationDate) - new Date(b.publicationDate)
      );
    }

    const bookListBody = document.getElementById("book-list-body");
    bookListBody.innerHTML = "";

    // Itera sobre os livros ordenados e cria as células da tabela
    sortedBooks.forEach(function (book, index) {
      const row = document.createElement("tr");
      const titleCell = document.createElement("td");
      const authorCell = document.createElement("td");
      const publicationDateCell = document.createElement("td");
      const actionCell = document.createElement("td");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      // Preenche as células com os dados do livro
      titleCell.textContent = book.title;
      authorCell.textContent = book.author;
      publicationDateCell.textContent = book.publicationDate;
      editButton.textContent = "Editar";
      deleteButton.textContent = "Remover";

      // Adiciona classes aos botões para estilização
      editButton.classList.add("edit-button");
      deleteButton.classList.add("delete-button");

      // Evento de clique para editar o livro
      editButton.addEventListener("click", function () {
        editBook(index);
      });

      // Evento de clique para remover o livro
      deleteButton.addEventListener("click", function () {
        deleteBook(index);
      });

      // Adiciona os botões à célula de ação
      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);

      // Adiciona as células à linha da tabela
      row.appendChild(titleCell);
      row.appendChild(authorCell);
      row.appendChild(publicationDateCell);
      row.appendChild(actionCell);

      // Adiciona a linha à tabela
      bookListBody.appendChild(row);
    });
  }

  // Função para editar um livro
  function editBook(index) {
    const book = library[index];
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const publicationDateInput = document.getElementById("publication-date");

    // Preenche os campos do formulário com os dados do livro selecionado para edição
    titleInput.value = book.title;
    authorInput.value = book.author;
    publicationDateInput.value = book.publicationDate;

    // Remove o livro do array e renderiza a lista de livros novamente
    library.splice(index, 1);
    renderBookList();
  }

  // Função para remover um livro
  function deleteBook(index) {
    // Remove o livro do array e renderiza a lista de livros novamente
    library.splice(index, 1);
    renderBookList();
  }
;

