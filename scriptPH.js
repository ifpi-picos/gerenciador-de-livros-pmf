const prompt = require("prompt-sync")();

const fs = require("fs");

let library = []
function registerBooks() {
  library = loadBookStore();
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

  library.push(book);
  saveBookStore(library);
}

    function saveBookStore(library) {
    const jSonLibrary = JSON.stringify(library);
    const libraryPath = "libraryPath.txt";
  
    fs.writeFileSync(libraryPath, jSonLibrary, "utf8", (err) => {
      if (err) {
        console.log(`Erro ao salvar o arquivo: ${err}`);
      } else {
        console.log(`Biblioteca salva com sucesso!`);
      }
    });
    }

    function loadBookStore() {
    try {
      const data = JSON.parse(fs.readFileSync("libraryPath.txt"));
      return data;
    } catch (erro) {
      console.log(`Não há itens cadatrados!`);
      return [];
    }
    }

    function listBooks() {
        const library = loadBookStore();
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
            .sort((a, b) => a.dateFormat.localeCompare(b.dateFormat));
        } else if (ordination.toUpperCase() === "D") {
          booksOrdained = library
            .slice()
            .sort((a, b) => new Date(a.dateFormat) - new Date(b.dateFormat));
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