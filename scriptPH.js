const prompt = require("prompt-sync")(); // Importa o módulo prompt-sync para entrada de dados no console de forma síncrona

const fs = require("fs"); // Importa o módulo fs para operações de leitura e escrita de arquivos

let library = []; // Declara uma variável para armazenar os livros cadastrados

// Função para cadastrar livros
function registerBooks() {
  library = loadBookStore(); // Carrega a biblioteca existente

  console.log(`******* Cadastro de Livro *******`);
  let title = prompt("Digite o título da obra:");
  let author = prompt("Digite o autor da obra:");
  let publicationDate = {
    day: Number(prompt("Digite o dia da publicação do livro:")),
    month: Number(prompt("Digite o mês de publicação do livro:")),
    year: Number(prompt("Digite o ano de publicação do livro:")),
  };

  let dateFormat = `${publicationDate.day}/${publicationDate.month}/${publicationDate.year}`;

  let book = { title, author, dateFormat };

  library.push(book); // Adiciona o livro à biblioteca

  saveBookStore(library); // Salva a biblioteca atualizada
}
// Função para salvar a biblioteca em um arquivo
function saveBookStore(library) {
  const jSonLibrary = JSON.stringify(library); // Converte a biblioteca para JSON

  const libraryPath = "libraryPath.txt"; // Define o caminho do arquivo de biblioteca

  fs.writeFileSync(libraryPath, jSonLibrary, "utf8", (err) => {
    if (err) {
      console.log(`Erro ao salvar o arquivo: ${err}`);
    } else {
      console.log(`Biblioteca salva com sucesso!`);
    }
  });
}
// Função para carregar a biblioteca do arquivo
function loadBookStore() {
  try {
    const data = JSON.parse(fs.readFileSync("libraryPath.txt")); // Lê os dados do arquivo e converte de JSON para objeto
    return data; // Retorna os dados da biblioteca
  } catch (erro) {
    console.log(`Não há itens cadatrados!`);
    return []; // Retorna uma matriz vazia se ocorrer algum erro ou o arquivo não existir
  }
}

// Função para listar os livros da biblioteca
function listBooks() {
  const library = loadBookStore(); // Carrega a biblioteca existente

  if (library.length === 0) {
    console.log("A biblioteca está vazia.");
    return;
  }

  const ordination = prompt(
    "Ordenar por título (T) ou por data de publicação (D)?"
  );

  let booksOrdained;
  if (ordination.toUpperCase() === "T") {
    booksOrdained = library
      .slice()
      .sort((a, b) => a.dateFormat.localeCompare(b.dateFormat)); // Ordena por título
  } else if (ordination.toUpperCase() === "D") {
    booksOrdained = library
      .slice()
      .sort((a, b) => new Date(a.dateFormat) - new Date(b.dateFormat)); // Ordena por data de publicação
  } else {
    console.log("Opção inválida.");
    return;
  }

  console.log("******** Livros na biblioteca *********");
  for (const book of booksOrdained) {
    console.log(`Título: ${book.title}`);
    console.log(`Autor: ${book.author}`);
    console.log(`Data de publicação: ${book.dateFormat}`);
    console.log("---");
  }
}

// Função para remover um livro da biblioteca
function removeBook(library) {
  console.log("********* REMOVER LIVRO **********");
  const titulo = prompt("Digite o titulo do livro que ele deseja remover:");
  const index = library.findIndex((livro) => livro.title === titulo);

  if (index === -1) {
    console.log(`Não há livros com esse título!`);
    return;
  }

  library.splice(index, 1); // Remove o livro da biblioteca
  saveBookStore(library); // Salva a biblioteca atualizada
  console.log("********* LIVRO REMOVIDO ********");
}

// Função para exibir o menu de opções
function menu() {
  console.log(`******** GERENCIADOR DE LIVROS ********`);
  console.log(`(A) Cadatrar Livro`);
  console.log(`(B) Remover Livro`);
  console.log(`(C) Listar Livros`);
  console.log(`(D) Editar Livro`);
  console.log(`(E) Sair`);
  console.log(`***************************************`);
}

function openLibrary() {
  let operate = true;
  do {
    menu();
    let option = prompt("Digite uma opção:");

    switch (option.toUpperCase()) {
      case "A":
        registerBooks();
        break;
      case "B":
        removeBook(library);
        break;
      case "C":
        listBooks();
        break;
      case "D":
        editBook();
        break;
      case "E":
        operate = false;
        console.log(`Obrigado,volte sempre!`);
        break;
      default:
        console.log(`Digite uma opção válida!`);
        break;
    }
  } while (operate);
}

function editBook() {
  console.log(`******* Edição de livro *******`);
  const titulo = prompt("Digite o título que deseja editar:");
  const index = library.findIndex((livro) => livro.titulo === titulo);

  if (index === -1) {
    console.log(`Livro não encontrado!`);
    return;
  }
  const livro = library[index];

  console.log(`Digite o novo título:`);
  const newTitle = prompt(`=>`);
  console.log(`Digite o novo autor:`);
  const newAuthor = prompt(`=>`);
  console.log(`Digite a nova data de publicação(DD/MM/AAAA):`);
  const newDate = prompt("=>");
  if (newTitle.trim() !== "") {
    livro.titulo = newTitle;
  }
  if (newAuthor.trim() !== "") {
    livro.author = newAuthor;
  }
  if (newDate.trim() !== "") {
    livro.dateFormat = newDate;
  }

  saveBookStore(library);
  console.log(`******* Livro editado com sucesso! *******`);
}
openLibrary(); // Executa o programa chamando a função openLibrary()
