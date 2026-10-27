let turma = [];


function listarAluno(){
   Interface.listar(turma);
}


function btnSalvar(){
  let a = Interface.salvar();
  turma.push(a);
}


function cadastroAluno(){
   Interface.cadastrar();
}
