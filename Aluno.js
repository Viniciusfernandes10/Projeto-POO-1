class Aluno {
  // Tudo é PRIVADO: só dá para ler/alterar via get e set
  #nome;
  #nota1;
  #nota2;
  #nota3;
  #media;
  #estado;

  constructor(nome, nota1, nota2, nota3) {
    this.#nome = nome;
    this.#nota1 = nota1;
    this.#nota2 = nota2;
    this.#nota3 = nota3;
    this.gerarMedia();
    this.gerarEstado();
  }

  // Nota válida: número de 0 a 10, com no máximo 1 casa decimal (regra da UFRN)
  static notaValida(valor) {
    if (typeof valor !== 'number' || isNaN(valor)) {
      return false;
    }
    if (valor < 0 || valor > 10) {
      return false;
    }
    let x10 = valor * 10;
    if (Math.abs(x10 - Math.round(x10)) > 0.000001) {
      return false; // tem mais de 1 casa decimal
    }
    return true;
  }

  // ---------- GETS e SETS das notas ----------
  getNota1() {
    return this.#nota1;
  }
  setNota1(valor) {
    if (!Aluno.notaValida(valor)) {
      return false; // nota inválida: não altera nada
    }
    this.#nota1 = valor;
    this.#atualizar();
    return true;
  }

  getNota2() {
    return this.#nota2;
  }
  setNota2(valor) {
    if (!Aluno.notaValida(valor)) {
      return false;
    }
    this.#nota2 = valor;
    this.#atualizar();
    return true;
  }

  getNota3() {
    return this.#nota3;
  }
  setNota3(valor) {
    if (!Aluno.notaValida(valor)) {
      return false;
    }
    this.#nota3 = valor;
    this.#atualizar();
    return true;
  }

  // ---------- média e situação ----------
  gerarMedia() {
    this.#media = (this.#nota1 + this.#nota2 + this.#nota3) / 3;
    return this.#media;
  }

  // Critério da UFRN (Resolução 035/2025-CONSEPE, arts. 100 a 103):
  //  Aprovado    -> média >= 6,0 E nota >= 4,0 em TODAS as unidades
  //  Recuperação -> não aprovou por média, mas média >= 3,0
  //  Reprovado   -> média < 3,0
  gerarEstado() {
    let est;

    // corta "sujeira" do ponto flutuante (ex.: 0.1 + 8.2 + 0.7 dá 8.999999999999998 e não 9)
    let media = Math.round(this.#media * 1000000) / 1000000;

    // menor das 3 notas
    let menorNota = this.#nota1;
    if (this.#nota2 < menorNota) {
      menorNota = this.#nota2;
    }
    if (this.#nota3 < menorNota) {
      menorNota = this.#nota3;
    }

    if (media >= 6 && menorNota >= 4) {
      est = 'Aprovado';
    } else if (media >= 3) {
      est = 'Recuperação';
    } else {
      est = 'Reprovado';
    }
    this.#estado = est;
    return est;
  }

  getMedia() {
    return this.#media;
  }

  getEstado() {
    return this.#estado;
  }

  // ---------- nome ----------
  getNome() {
    return this.#nome;
  }

  setNome(nome) {
    this.#nome = nome;
  }

  // sempre que uma nota muda, recalcula média e situação
  #atualizar() {
    this.gerarMedia();
    this.gerarEstado();
  }
} //fim da classe