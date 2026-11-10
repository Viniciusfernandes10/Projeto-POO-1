class Turma {
    #professor;
    #curso;
    #alunos; // conjunto de alunos da turma
  
    constructor(professor, curso) {
      this.#professor = professor;
      this.#curso = curso;
      this.#alunos = [];
    }
  
    getProfessor() {
      return this.#professor;
    }
  
    getCurso() {
      return this.#curso;
    }
  
    adicionarAluno(aluno) {
      this.#alunos.push(aluno);
    }
  
    getQuantidade() {
      return this.#alunos.length;
    }
  
    // devolve o aluno da posição i (0, 1, 2...)
    getAluno(i) {
      return this.#alunos[i];
    }
  } //fim da classe