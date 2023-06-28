//  Importando o módulo fs, utilizado para leitura e escrita de arquivos
const fs = require('fs');

let biblioteca = []; // Armazenar os livros cadastrados.

// Função para exibir o menu de opções do Gerenciador de livros
function exibirMenu() {
  console.log('======== Gerenciador de livros =======');
  console.log('1. Cadastrar livro');
  console.log('2. Listar livros');
  console.log('3. Remover livro');
  console.log('4. Alterar detalhes do livro');
  console.log('5. Sair');
  console.log('===========================\n');
}