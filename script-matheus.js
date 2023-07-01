//  Importando o módulo fs, utilizado para leitura e escrita de arquivos
const fs = require('fs');

let biblioteca = []; // Armazenar os livros cadastrados.

// Função para exibir o menu de opções do Gerenciador de livros
function exibirMenu() {
  console.log('//====== Gerenciador de livros =====//');
  console.log('1 - Cadastrar um livro');
  console.log('2 - Listar os livros cadastrados');
  console.log('3 - Remover um livro da Biblioteca');
  console.log('4 - Alterar detalhes de um livro');
  console.log('5 - Sair do programa');
  console.log('===========================\n');
}

// Função para cadastrar um livro 
function cadastrarLivro() {
  console.log('//====== Cadastro de Livro =====//');
  const titulo = prompt('Insira o título do livro:');
  const autor = prompt('Insira o autor do livro:');
  const data = prompt('Insira a data de publicação do livro:');

  const livro = { titulo, autor, data };
  biblioteca.push(livro);

  salvarBiblioteca();

  console.log('Livro cadastrado com sucesso!');
  console.log('================================\n');
}

// Função para exibir e organizar a listagem dos livros
function listarLivros() {
  if (biblioteca.length === 0) {
    console.log('Não há livros na biblioteca.');
    return;
  } 

  console.log('Ordenar por título ou por data de publicação?')
  const ordenacao = prompt('Insira T ou D:');

  let livrosOrdenados; // Fazer a ordenação dos livros
  if (ordenacao.toUpperCase() === 'T') {
    livrosOrdenados = biblioteca.slice().sort((a, b) => a.titulo.localeCompare(b.titulo));
  } else if (ordenacao.toUpperCase() === 'D') {
    livrosOrdenados = biblioteca.slice().sort((a, b) => {
      const dataA = new Date(a.data.split('/').reverse().join('-'));
      const dataB = new Date(b.data.split('/').reverse().join('-'));
      return dataB - dataA;
    }); 
  } else {
    console.log('Opção inválida.');
    return;
  }

  // Exibir os livros ordenados
  console.log('\n//====== Livros na biblioteca =====//');
  for (const livro of livrosOrdenados) {
    console.log(`Título: ${livro.titulo}`);
    console.log(`Autor: ${livro.autor}`);
    console.log(`Data de publicação: ${livro.data}`);
    console.log('---');
  }
}

// Função para remover um livro
function removerLivro() {
  console.log('//====== Remover um Livro =====//');
  const titulo = prompt('Digite o título do livro que deseja remover:');
  const index = biblioteca.findIndex(livro => livro.titulo === titulo);

  if (index === -1) {
    console.log('Livro não encontrado.');
    return;
  }

  biblioteca.splice(index, 1);
  salvarBiblioteca();

  console.log('Livro removido com sucesso!');
  console.log('=================================\n');
}

// Função para alterar os detalhes de um livro já cadastrado
function alterarDetalhesLivro() {
  console.log('//====== Alteração de Detalhes de um Livro =====//');
  const titulo = prompt('Digite o título do livro que deseja alterar:');
  const index = biblioteca.findIndex(livro => livro.titulo === titulo);

  if (index === -1) {
    console.log('Livro não encontrado.');
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

// Função que inicia todo o funcionamento do programa
function iniciar() {
  carregarBiblioteca();

  let executando = true; // Funcionará enquanto o usuário realizar suas operações
  while (executando) {
    exibirMenu();
    const opcao = prompt('Insira a opção desejada:');
    console.log();

    switch (opcao) {
      case '1':
        cadastrarLivro();
        break;
      case '2':
        listarLivros();
        break;
      case '3':
        removerLivro();
        break;
      case '4':
        alterarDetalhesLivro();
        break;
      case '5':
        executando = false;
        break;
      default:
        console.log('Opção inválida.');
        break;
    }

    console.log();
  }
}

iniciar();