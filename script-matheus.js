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

// Função para cadastrar um livro 
function cadastrarLivro() {
  console.log('======== Cadastro de Livro =======');
  const titulo = prompt('Digite o título do livro:');
  const autor = prompt('Digite o autor do livro:');
  const data = prompt('Digite a data de publicação do livro (formato: DD/MM/AAAA):');

  const livro = { titulo, autor, data };
  biblioteca.push(livro);

  salvarBiblioteca();

  console.log('Livro cadastrado com sucesso!');
  console.log('================================\n');
}

// Função para exibir e organizar a listagem dos livros
function listarLivros() {
  if (biblioteca.length === 0) {
    console.log('A biblioteca está vazia.');
    return;
  } 

  const ordenacao = prompt('Ordenar por título (T) ou por data de publicação (D)?');

  let livrosOrdenados; // Fazer a ordenação dos livros
  if (ordenacao.toUpperCase() === 'T') {
    livrosOrdenados = biblioteca.slice().sort((a, b) => a.titulo.localeCompare(b.titulo));
  } else if (ordenacao.toUpperCase() === 'D') {
    livrosOrdenados = biblioteca.slice().sort((a, b) => new Date(a.data) - new Date(b.data));
  } else {
    console.log('Opção inválida.');
    return;
  }

  // Exibir os livros ordenados
  console.log('======== Livros na biblioteca =======');
  for (const livro of livrosOrdenados) {
    console.log(`Título: ${livro.titulo}`);
    console.log(`Autor: ${livro.autor}`);
    console.log(`Data de publicação: ${livro.data}`);
    console.log('---');
  }
}

// Função para remover um livro
function removerLivro() {
  console.log('======== Remoção de Livro =======');
  const titulo = prompt('Digite o título do livro que deseja remover:');
  const index = biblioteca.findIndex(livro => livro.titulo === titulo);

  if (index === -1) {
    console.log('Livro não encontrado na biblioteca.');
    return;
  }

  biblioteca.splice(index, 1);
  salvarBiblioteca();

  console.log('Livro removido com sucesso!');
  console.log('=================================\n');
}

// Função para alterar os detalhes de um livro já cadastrado
function alterarDetalhesLivro() {
  console.log('======== Alteração de Detalhes do Livro =======');
  const titulo = prompt('Digite o título do livro que deseja alterar:');
  const index = biblioteca.findIndex(livro => livro.titulo === titulo);

  if (index === -1) {
    console.log('Livro não encontrado na biblioteca.');
    return;
  }

  const livro = biblioteca[index];

  console.log('\nDigite o novo título do livro (ou deixe em branco para manter o título atual):');
  let novoTitulo = prompt('Escreva aqui:');
  console.log('\nDigite o novo autor do livro (ou deixe em branco para manter o autor atual):');
  let novoAutor = prompt('Escreva aqui:');
  console.log('\nDigite a nova data de publicação do livro (formato: DD/MM/AAAA) (ou deixe em branco para manter a data atual):');
  let novaData = prompt('Escreva aqui:');

  if (novoTitulo.trim() !== '') {
    livro.titulo = novoTitulo;
  }

  if (novoAutor.trim() !== '') {
    livro.autor = novoAutor;
  }

  if (novaData.trim() !== '') {
    livro.data = novaData;
  }

  salvarBiblioteca();

  console.log('\nDetalhes do livro alterados com sucesso!');
  console.log('=========================================\n');
}

// Função para salvar os livros em um arquivo .txt
function salvarBiblioteca() {
  const conteudo = biblioteca.map(livro => `${livro.titulo};${livro.autor};${livro.data}`).join('\n');
  fs.writeFileSync('livros.txt', conteudo);
}

// Função para carregar os livros que foram salvos no arquivo .txt
function carregarBiblioteca() {
  if (fs.existsSync('livros.txt')) {
    const conteudo = fs.readFileSync('livros.txt', 'utf-8');
    const linhas = conteudo.split('\n');

    for (const linha of linhas) {
      if (linha.trim() === '') {
    continue;
  }
      const [titulo, autor, data] = linha.split(';');
      biblioteca.push({ titulo, autor, data });
    }
  }
}