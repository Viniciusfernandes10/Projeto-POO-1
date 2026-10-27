class Interface{


    constructor(){
    
    
    }   
    static salvar() {
     let nome = document.getElementById('nome').value;
     let n1 = Number(document.getElementById('n1').value);
     let n2 = Number(document.getElementById('n2').value);
     let n3 = Number(document.getElementById('n3').value);
     let a1 = new Aluno(nome, n1, n2, n3);
     let m = a1.gerarMedia(n1, n2, n3);
     a1.gerarEstado(m);
     //turma[turma.length] = a1;
     alert('aluno cadastrado');
     return a1;
    }
    static listar(turma) {
     const btnCadastrar = document.getElementById('btn-cadastrar');
     const tabCadastrar = document.getElementById('tab-cadastrar');
     const btnListar = document.getElementById('btn-listar');
     const tabListar = document.getElementById('tab-listar');
    
    
     btnListar.classList.add('active');
     btnCadastrar.classList.remove('active');
    
    
     // Ajusta o conteúdo visível
     tabListar.classList.add('active');
     tabCadastrar.classList.remove('active');
     let lista = '<table>';
     lista += '<tr><th>Nome</th> <th>Media</th> <th>Situação</th></tr>';
     for (let i = 0; i < turma.length; i++) {
       lista =
         lista +
         "<tr>"+
         "<td>"+turma[i].getNome() +"</td>"+
         "<td>"+turma[i].media.toFixed(2) +"</td>"+
         "<td>"+turma[i].estado +"</td>"
         "</tr>";
     }
     lista += "</table>"
     document.getElementById('alunos').innerHTML = lista;
    }
    
    
    static cadastrar() {
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
    }//fim da classe
    