const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');

let filename = 'biblioteca.txt';
let biblioteca = [];

function cadastrarLivro() {
  console.log('======= Novo Cadastro de Livro =======');
  const titulo = prompt('Digite o título do livro: ');
  const autor = prompt('Digite o autor do livro: ');
  const data = Number(prompt('Digite a data de publicação do livro (formato: DD/MM/AAAA): '));

  const livro = { titulo, autor, data };
  biblioteca.push(livro);

  salvarBiblioteca();

  console.log('Livro cadastrado com sucesso!');
  console.log('==================================\n');
}