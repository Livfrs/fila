class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element); // Adiciona ao final da fila
  }

  dequeue() {
    if (this.isEmpty()) return null;

    const prioridades = {
      deficiencia: 2,
      autista: 2,
      idoso: 2,
      gestante: 2,
      lactante: 2,
      crianca_colo: 2,
      obeso: 2,
      mobilidade: 2,
      doador_sangue: 2,
      outro: 2,
      comum: 1, // "Comum" tem menor prioridade
    };

    // Ordena a fila temporariamente para remover o de maior prioridade
    this.items.sort((a, b) => prioridades[b.tipoPessoa] - prioridades[a.tipoPessoa]);

    return this.items.shift(); // Remove e retorna o primeiro da fila ordenada
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  peek() {
    return this.isEmpty() ? null : this.items[0]; // Mostra o primeiro sem remover
  }

  getItems() {
    return [...this.items]; // Retorna uma cópia da fila
  }
}

// Criando uma instância da fila
const fila = new Queue();

function mostrarCidInput() {
  const tipoPessoa = document.getElementById("tipoPessoa").value;
  const cidInput = document.getElementById("cidInput");
  cidInput.style.display = tipoPessoa === "outro" ? "block" : "none";
}

function adicionarFila() {
  const nome = document.getElementById("nome").value;
  const tipoPessoa = document.getElementById("tipoPessoa").value;
  const cid = document.getElementById("cid").value;

  if (nome === "") {
    alert("Por favor, insira o nome!");
    return;
  }

  const pessoa = {
    nome,
    tipoPessoa,
    cid: tipoPessoa === "outro" ? cid : "",
  };

  fila.enqueue(pessoa); // Adiciona à fila

  document.getElementById("nome").value = "";
  document.getElementById("cid").value = "";

  mostrarFila();
  alert("Pessoa adicionada à fila!");
}

function mostrarFila() {
  const filaUl = document.getElementById("fila");
  filaUl.innerHTML = "";

  if (fila.isEmpty()) {
    filaUl.innerHTML = "<li>Fila vazia</li>";
    return;
  }

  const prioridades = {
    deficiencia: 2,
    autista: 2,
    idoso: 2,
    gestante: 2,
    lactante: 2,
    crianca_colo: 2,
    obeso: 2,
    mobilidade: 2,
    doador_sangue: 2,
    outro: 2,
    comum: 1, // "Comum" tem menor prioridade
  };

  // Ordena apenas para exibição, sem alterar a fila original
  const filaOrdenada = fila.getItems().sort((a, b) => prioridades[b.tipoPessoa] - prioridades[a.tipoPessoa]);

  filaOrdenada.forEach((pessoa, index) => {
    const li = document.createElement("li");
    li.textContent = `Posição ${index + 1}: ${pessoa.nome} - ${pessoa.tipoPessoa}`;
    if (pessoa.cid) {
      li.textContent += ` (CID: ${pessoa.cid})`;
    }
    filaUl.appendChild(li);
  });
}

function chamarPessoa() {
  if (fila.isEmpty()) {
    alert("Não há pessoas na fila.");
    return;
  }

  const pessoaChamada = fila.dequeue(); // Remove a pessoa com maior prioridade
  const statusAtendimento = document.getElementById("statusAtendimento");
  statusAtendimento.textContent = `Atendimento em andamento: ${pessoaChamada.nome} - ${pessoaChamada.tipoPessoa}`;

  mostrarFila();
}
