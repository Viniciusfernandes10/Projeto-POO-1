let turma = [];
function salvar() {
  let nome = document.getElementById('nome').value;
  let n1 = Number(document.getElementById('n1').value);
  let n2 = Number(document.getElementById('n2').value);
  let n3 = Number(document.getElementById('n3').value);
  let a1 = new Aluno(nome, n1, n2, n3);
  let m = a1.gerarMedia(n1, n2, n3);
  turma[turma.length] = a1;
  alert('aluno cadastrado');
}
function listar() {
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const tabCadastrar = document.getElementById('tab-cadastrar');
  const btnListar = document.getElementById('btn-listar');
  const tabListar = document.getElementById('tab-listar');


  btnListar.classList.add('active');
  btnCadastrar.classList.remove('active');


  // Ajusta o conteúdo visível
  tabListar.classList.add('active');
  tabCadastrar.classList.remove('active');
  let lista = ' ';
  for (let i = 0; i < turma.length; i++) {
    lista = lista + turma[i].nome + ' - ' + turma[i].media + '<br>';
  }
  document.getElementById('alunos').innerHTML = lista;
}


function cadastrar() {
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const tabCadastrar = document.getElementById('tab-cadastrar');
  const btnListar = document.getElementById('btn-listar');
  const tabListar = document.getElementById('tab-listar');


  btnListar.classList.remove('active');
  btnCadastrar.classList.add('active');


  // Ajusta o conteúdo visível
  tabListar.classList.remove('active');
  tabCadastrar.classList.add('active');
  //document.getElementById("media").innerHTML = m;
}
