//  Importando o módulo fs, utilizado para leitura e escrita de arquivos
const fs = require('fs');

let biblioteca = []; // Armazenar os livros cadastrados.

// Função para exibir o menu de opções do Gerenciador de livros
function menu() {
  console.log('//----- Gerenciador de livros -----//');
  console.log('1 -> Cadastrar um livro');
  console.log('2 -> Listar os livros cadastrados');
  console.log('3 -> Alterar detalhes de um livro');
  console.log('4 -> Remover um livro da Biblioteca');
  console.log('5 -> Sair do programa');
  console.log('-----------------------------------\n');
}

// Função para cadastrar um livro 
function cadastro() {
  console.log('//----- Cadastro de Livro -----//');
  const titulo = prompt('Insira o título do livro:');
  const autor = prompt('Insira o autor do livro:');
  const data = prompt('Insira a data de publicação do livro:');

  const livro = { titulo, autor, data };
  biblioteca.push(livro);

  salvarBiblioteca();

  console.log('Livro cadastrado com sucesso!');
  console.log('------------------------------\n');
}

// Função para exibir e organizar a listagem dos livros
function listagem() {
  if (biblioteca.length === 0) {
    console.log('Não há livros na biblioteca.');
    return;
  } 

  console.log('Ordenar por título ou por data de publicação?')
  const organizados = prompt('Insira: titulo ou data:');

  let bibliotecaOrganizada; // Fazer a ordenação dos livros
  if (organizados.toUpperCase() === 'TITULO') {
    bibliotecaOrganizada = biblioteca.slice().sort((a, b) => a.titulo.localeCompare(b.titulo));
  } else if (organizados.toUpperCase() === 'DATA') {
    bibliotecaOrganizada = biblioteca.slice().sort((a, b) => {
      const dataA = new Date(a.data.split('/').reverse().join('-'));
      const dataB = new Date(b.data.split('/').reverse().join('-'));
      return dataB - dataA;
    }); 
  } else {
    console.log('Opção inválida');
    return;
  }

  // Exibir os livros bibliotecaOrganizada
  console.log('\n//----- Livros na biblioteca -----//');
  for (const livro of bibliotecaOrganizada) {
    console.log(`Título: ${livro.titulo}`);
    console.log(`Autor: ${livro.autor}`);
    console.log(`Data de publicação: ${livro.data}`);
    console.log('---');
  }
}

// Função para alterar os detalhes de um livro já cadastrado
function modificar() {
  console.log('//----- Alteração de Detalhes de um Livro -----//');
  const titulo = prompt('Digite o título do livro que deseja alterar:');
  const index = biblioteca.findIndex(livro => livro.titulo === titulo);

  if (index === -1) {
    console.log('Livro não encontrado.');
    return;
  }

  const livro = biblioteca[index];

  console.log('\nDeixe em branco o que não quiser alterar')
  console.log('\nDigite o novo título:');
  let novoTitulo = prompt('Escreva aqui:');
  console.log('\nDigite o novo autor:');
  let novoAutor = prompt('Escreva aqui:');
  console.log('\nDigite a nova data de publicação no formato: DD/MM/AAAA:');
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
  console.log('-------------------------------------------\n');
}

// Função para remover um livro
function remover() {
  console.log('//----- Remoção de um Livro -----//');
  const titulo = prompt('Digite o título do livro que deseja remover:');
  const index = biblioteca.findIndex(livro => livro.titulo === titulo);

  if (index === -1) {
    console.log('Livro não encontrado.');
    return;
  }

  biblioteca.splice(index, 1);
  salvarBiblioteca();

  console.log('Livro removido com sucesso!');
  console.log('-------------------------------\n');
}

// Função para salvar os livros em um arquivo .txt
function salvarBiblioteca() {
  const livrosArmazenados = biblioteca.map(livro => `${livro.titulo};${livro.autor};${livro.data}`).join('\n');
  fs.writeFileSync('livros.txt', livrosArmazenados);
}

// Função para carregar os livros que foram salvos no arquivo .txt
function carregarBiblioteca() {
  if (fs.existsSync('livros.txt')) {
    const livrosArmazenados = fs.readFileSync('livros.txt', 'utf-8');
    const linhas = livrosArmazenados.split('\n');

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
    menu();
    const opcao = prompt('Insira a operação desejada:');
    console.log();

    switch (opcao) {
      case '1':
        cadastro();
        break;
      case '2':
        listagem();
        break;
      case '3':
        modificar();
        break;
      case '4':
        remover();
        break;
      case '5':
        executando = false;
        break;
      default:
        console.log('Opção inválida');
        break;
    }

    console.log();
  }
}

iniciar();