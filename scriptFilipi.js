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
  function alterarDetalhesLivro() {
    console.log('======= Alterar Detalhes do Livro =======');
    const titulo = prompt('Digite o título do livro que deseja alterar: ');
  
    const livroIndex = biblioteca.findIndex(livro => livro.titulo === titulo);
  
    if (livroIndex === -1) {
      console.log('Livro não encontrado na biblioteca.');
      return;
    }
  
    const livro = biblioteca[livroIndex];
  
    const novoTitulo = prompt('Digite o novo título do livro (ou deixe em branco para manter o título atual): ');
    const novoAutor = prompt('Digite o novo autor do livro (ou deixe em branco para manter o autor atual): ');
    const novaData = prompt('Digite a nova data de publicação do livro (formato: DD/MM/AAAA) (ou deixe em branco para manter a data atual): ');
  
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
  
    console.log('Detalhes do livro alterados com sucesso!');
    console.log('========================================\n');
  }
  function salvarBiblioteca() {
    const conteudo = biblioteca.map(livro => `${livro.titulo};${livro.autor};${livro.data}`).join('\n');
    fs.writeFileSync(filename, conteudo);
  }
  function carregarBiblioteca() {
    if (fs.existsSync(filename)) {
      const conteudo = fs.readFileSync(filename, 'utf-8');
      const linhas = conteudo.split('\n');
  
      for (const linha of linhas) {
        const [titulo, autor, data] = linha.split(';');
        biblioteca.push({ titulo, autor, data });
      }
    }
  }
  function iniciar() {
    carregarBiblioteca();
  
    let executando = true;
    while (executando) {
      Menu();
      const opcao = prompt('Digite uma opção: ');
      console.log();
  
      if (opcao === '1') {
        cadastrarLivro();
      } else if (opcao === '2') {
        listarLivros();
      } else if (opcao === '3') {
        removerLivro();
      } else if (opcao === '4') {
        alterarDetalhesLivro();
      } else if (opcao === '5') {
        executando = false;
      } else {
        console.log('Opção inválida.');
      }
  
      console.log();
    }
  }
  iniciar();

console.log('Obrigado por utilizar o Gerenciador de Livros!');
console.log('');






///////////////////////////////////////////////////////////////////////////////////
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

function alterarDetalhesLivro() {
  console.log('======= Alterar Detalhes do Livro =======');
  const titulo = prompt('Digite o título do livro que deseja alterar: ');

  const livroIndex = biblioteca.findIndex(livro => livro.titulo === titulo);

  if (livroIndex === -1) {
    console.log('Livro não encontrado na biblioteca.');
    return;
  }

  const livro = biblioteca[livroIndex];

  const novoTitulo = prompt('Digite o novo título do livro (ou deixe em branco para manter o título atual): ');
  const novoAutor = prompt('Digite o novo autor do livro (ou deixe em branco para manter o autor atual): ');
  const novaData = prompt('Digite a nova data de publicação do livro (formato: DD/MM/AAAA) (ou deixe em branco para manter a data atual): ');

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

  console.log('Detalhes do livro alterados com sucesso!');
  console.log('========================================\n');
}

function salvarBiblioteca() {
  const conteudo = biblioteca.map(livro => `${livro.titulo};${livro.autor};${livro.data}`).join('\n');
  fs.writeFileSync(filename, conteudo);
}

function carregarBiblioteca() {
  if (fs.existsSync(filename)) {
    const conteudo = fs.readFileSync(filename, 'utf-8');
    const linhas = conteudo.split('\n');

    for (const linha of linhas) {
      const [titulo, autor, data] = linha.split(';');
      biblioteca.push({ titulo, autor, data });
    }
  }
}

function Menu() {
  console.log('======= Gerenciador de Livros =======');
  console.log('1. Cadastrar novo livro');
  console.log('2. Listar todos os livros');
  console.log('3. Remover um livro');
  console.log('4. Alterar detalhes de um livro');
  console.log('5. Sair');
  console.log('===================================\n');
}

function iniciar() {
  carregarBiblioteca();

  let executando = true;
  while (executando) {
    Menu();
    const opcao = prompt('Digite uma opção: ');
    console.log();

    if (opcao === '1') {
      cadastrarLivro();
    } else if (opcao === '2') {
      listarLivros();
    } else if (opcao === '3') {
      removerLivro();
    } else if (opcao === '4') {
      alterarDetalhesLivro();
    } else if (opcao === '5') {
      executando = false;
    } else {
      console.log('Opção inválida.');
    }

    console.log();
  }
}

iniciar();

console.log('Obrigado por utilizar o Gerenciador de Livros!');
console.log('');
  
