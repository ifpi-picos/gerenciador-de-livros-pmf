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
function listarLivros() {
    if (biblioteca.length === 0) {
      console.log('A biblioteca está vazia.');
      return;
    }
  
    console.log('======= Livros na biblioteca =======');
    
    const ordenacao = prompt('Ordenar por título (T) ou por data de publicação (D)?').toUpperCase();
  
    if (ordenacao === 'T') {
      biblioteca.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (ordenacao === 'D') {
      biblioteca.sort((a, b) => new Date(a.data) - new Date(b.data));
    } else {
      console.log('Opção inválida.');
      return;
    }
  
    for (const livro of biblioteca) {
      console.log(`Título: ${livro.titulo}`);
      console.log(`Autor: ${livro.autor}`);
      console.log(`Data de publicação: ${livro.data}`);
      console.log('---');
    }
  }
  function removerLivro() {
    console.log('======= Remover Livro =======');
    let titulo = prompt('Digite o título do livro que deseja remover: ');
  
    const livroIndex = biblioteca.findIndex(livro => livro.titulo === titulo);
  
    if (livroIndex === -1) {
      console.log('Livro não encontrado na biblioteca.');
      return;
    }
  
    biblioteca.splice(livroIndex, 1);
    salvarBiblioteca();
  
    console.log('Livro removido com sucesso!');
    console.log('=============================\n');
  }