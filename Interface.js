class Interface {
  // guarda qual aluno está com as notas em edição
  static #editando = null;

  // utilitários 

  // evita que um nome com < ou > quebre a página (HTML injetado)
  static escapar(texto) {
    return String(texto)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // lê uma nota digitada
  static lerNota(id) {
    let texto = document.getElementById(id).value.trim().replace(',', '.');
    if (texto === '') {
      return NaN;
    }
    return Number(texto);
  }

  // troca de aba: 'turma', 'cadastrar' (aluno) ou 'listar'
  static mostrarAba(aba) {
    const abas = ['turma', 'cadastrar', 'listar'];
    for (let i = 0; i < abas.length; i++) {
      const btn = document.getElementById('btn-' + abas[i]);
      const conteudo = document.getElementById('tab-' + abas[i]);
      if (abas[i] === aba) {
        btn.classList.add('active');
        conteudo.classList.add('active');
      } else {
        btn.classList.remove('active');
        conteudo.classList.remove('active');
      }
    }
  }

  static classeEstado(estado) {
    if (estado === 'Aprovado') {
      return 'estado-aprovado';
    }
    if (estado === 'Recuperação') {
      return 'estado-recuperacao';
    }
    return 'estado-reprovado';
  }

  static nomeDaTurma(turma) {
    return Interface.escapar(turma.getCurso()) + ' — Prof. ' + Interface.escapar(turma.getProfessor());
  }

  // aba TURMAS

  static abrirTurma(turmas) {
    Interface.mostrarAba('turma');
    Interface.mostrarTurmas(turmas);
  }

  // lê o formulário e devolve uma Turma (ou null se faltar algo)
  static salvarTurma() {
    let professor = document.getElementById('professor').value.trim();
    let curso = document.getElementById('curso').value.trim();

    if (professor === '' || curso === '') {
      alert('Preencha o professor e o nome do curso.');
      return null;
    }

    let turma = new Turma(professor, curso);
    document.getElementById('professor').value = '';
    document.getElementById('curso').value = '';
    alert('Turma cadastrada');
    return turma;
  }

  static mostrarTurmas(turmas) {
    let html = '';
    if (turmas.length === 0) {
      html = '<li>Nenhuma turma cadastrada ainda.</li>';
    }
    for (let i = 0; i < turmas.length; i++) {
      html +=
        '<li>' +
        Interface.nomeDaTurma(turmas[i]) +
        ' (' + turmas[i].getQuantidade() + ' aluno(s))' +
        '</li>';
    }
    document.getElementById('lista-turmas').innerHTML = html;
  }

  // aba CADASTRAR ALUNO 

  static abrirCadastro(turmas) {
    Interface.mostrarAba('cadastrar');

    const aviso = document.getElementById('aviso-sem-turma');
    const form = document.getElementById('form-aluno');
    const select = document.getElementById('turma-aluno');

    // sem turma cadastrada, não dá para cadastrar aluno
    if (turmas.length === 0) {
      aviso.hidden = false;
      form.hidden = true;
      return;
    }
    aviso.hidden = true;
    form.hidden = false;

    // monta a lista de turmas (mantendo a que já estava escolhida)
    let escolhida = select.value;
    let opcoes = '';
    for (let i = 0; i < turmas.length; i++) {
      opcoes += '<option value="' + i + '">' + Interface.nomeDaTurma(turmas[i]) + '</option>';
    }
    select.innerHTML = opcoes;
    if (escolhida !== '' && Number(escolhida) < turmas.length) {
      select.value = escolhida;
    }
  }

  // lê o formulário
  static salvarAluno() {
    let indice = document.getElementById('turma-aluno').value;
    let nome = document.getElementById('nome').value.trim();

    if (indice === '') {
      alert('Escolha uma turma.');
      return null;
    }
    if (nome === '') {
      alert('Digite o nome do aluno.');
      return null;
    }

    let n1 = Interface.lerNota('n1');
    let n2 = Interface.lerNota('n2');
    let n3 = Interface.lerNota('n3');

    if (!Aluno.notaValida(n1) || !Aluno.notaValida(n2) || !Aluno.notaValida(n3)) {
      alert('As notas devem ser números de 0 a 10, com no máximo 1 casa decimal (ex.: 7,5).');
      return null;
    }

    let aluno = new Aluno(nome, n1, n2, n3);

    document.getElementById('nome').value = '';
    document.getElementById('n1').value = '';
    document.getElementById('n2').value = '';
    document.getElementById('n3').value = '';
    alert('Aluno cadastrado');
    return { indiceTurma: Number(indice), aluno: aluno };
  }

  // aba LISTAR ALUNOS (com edição das notas)

  static listar(turmas) {
    Interface.mostrarAba('listar');

    let html = '';
    if (turmas.length === 0) {
      html = '<p>Nenhuma turma cadastrada ainda.</p>';
    }

    for (let t = 0; t < turmas.length; t++) {
      const turma = turmas[t];
      html += '<h4>' + Interface.nomeDaTurma(turma) + '</h4>';

      if (turma.getQuantidade() === 0) {
        html += '<p class="vazio">Nenhum aluno nesta turma.</p>';
        continue;
      }

      html += '<table>';
      html +=
        '<tr><th>Nome</th><th>Nota 1</th><th>Nota 2</th><th>Nota 3</th>' +
        '<th>Média</th><th>Situação</th><th>Ações</th></tr>';

      for (let a = 0; a < turma.getQuantidade(); a++) {
        const aluno = turma.getAluno(a);
        const emEdicao =
          Interface.#editando !== null &&
          Interface.#editando.t === t &&
          Interface.#editando.a === a;

        html += '<tr>';
        html += '<td>' + Interface.escapar(aluno.getNome()) + '</td>';

        if (emEdicao) {
          // notas viram campos de texto
          html += '<td><input class="nota-edit" id="edit-n1" value="' + aluno.getNota1().toFixed(1) + '" /></td>';
          html += '<td><input class="nota-edit" id="edit-n2" value="' + aluno.getNota2().toFixed(1) + '" /></td>';
          html += '<td><input class="nota-edit" id="edit-n3" value="' + aluno.getNota3().toFixed(1) + '" /></td>';
        } else {
          html += '<td>' + aluno.getNota1().toFixed(1) + '</td>';
          html += '<td>' + aluno.getNota2().toFixed(1) + '</td>';
          html += '<td>' + aluno.getNota3().toFixed(1) + '</td>';
        }

        html += '<td>' + aluno.getMedia().toFixed(2) + '</td>';
        html += '<td class="' + Interface.classeEstado(aluno.getEstado()) + '">' + aluno.getEstado() + '</td>';

        if (emEdicao) {
          html +=
            '<td><button class="btn-tabela" onclick="salvarEdicao(' + t + ',' + a + ')">Salvar</button> ' +
            '<button class="btn-tabela btn-secundario" onclick="cancelarEdicao()">Cancelar</button></td>';
        } else {
          html += '<td><button class="btn-tabela" onclick="editarAluno(' + t + ',' + a + ')">Editar notas</button></td>';
        }
        html += '</tr>';
      }
      html += '</table>';
    }

    document.getElementById('alunos').innerHTML = html;
  }

  static iniciarEdicao(turmas, t, a) {
    Interface.#editando = { t: t, a: a };
    Interface.listar(turmas);
  }

  static cancelarEdicao(turmas) {
    Interface.#editando = null;
    Interface.listar(turmas);
  }

  // valida as 3 notas e só então altera (via set)
  static salvarEdicao(turmas, t, a) {
    let n1 = Interface.lerNota('edit-n1');
    let n2 = Interface.lerNota('edit-n2');
    let n3 = Interface.lerNota('edit-n3');

    if (!Aluno.notaValida(n1) || !Aluno.notaValida(n2) || !Aluno.notaValida(n3)) {
      alert('As notas devem ser números de 0 a 10, com no máximo 1 casa decimal (ex.: 7,5).');
      return;
    }

    let aluno = turmas[t].getAluno(a);
    aluno.setNota1(n1);
    aluno.setNota2(n2);
    aluno.setNota3(n3);

    Interface.#editando = null;
    Interface.listar(turmas);
  }
} //fim da classe