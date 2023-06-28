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
}