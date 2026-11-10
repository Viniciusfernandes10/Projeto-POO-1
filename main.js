// main.js = fachada: guarda os dados e chama a Interface
let turmas = [];

// ----- Turmas -----
function cadastroTurma() {
  Interface.abrirTurma(turmas);
}

function btnSalvarTurma() {
  let t = Interface.salvarTurma();
  if (t !== null) {
    turmas.push(t);
    Interface.mostrarTurmas(turmas);
  }
}

// ----- Alunos -----
function cadastroAluno() {
  Interface.abrirCadastro(turmas);
}

function btnSalvar() {
  // regra: não existe aluno sem turma
  if (turmas.length === 0) {
    alert('Cadastre uma turma antes de cadastrar um aluno.');
    return;
  }
  let r = Interface.salvarAluno();
  if (r !== null) {
    turmas[r.indiceTurma].adicionarAluno(r.aluno);
  }
}

function listarAluno() {
  Interface.listar(turmas);
}

// ----- Edição das notas (tela de exibição dos alunos) -----
function editarAluno(t, a) {
  Interface.iniciarEdicao(turmas, t, a);
}

function salvarEdicao(t, a) {
  Interface.salvarEdicao(turmas, t, a);
}

function cancelarEdicao() {
  Interface.cancelarEdicao(turmas);
}