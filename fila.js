class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    // Definindo prioridades
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

    // Calculando a prioridade do novo elemento
    const prioridadePessoa = prioridades[element.tipoPessoa];

    // Inserindo a pessoa na fila de acordo com a prioridade
    let inserido = false;
    for (let i = 0; i < this.items.length; i++) {
      // Se a pessoa a ser inserida tem maior ou igual prioridade que a da posição i
      if (prioridades[this.items[i].tipoPessoa] < prioridadePessoa) {
        this.items.splice(i, 0, element); // Insere na posição i
        inserido = true;
        break;
      }
    }

    if (!inserido) {
      // Caso a pessoa tenha menor prioridade ou seja a última, adiciona no final
      this.items.push(element);
    }
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift(); // Remove e retorna o primeiro da fila
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

// Criando uma instância da fila de espera
const filaEspera = new Queue();

// Criando uma instância da fila de concluídos
const filaConcluidos = new Queue();

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
    status: 'esperando', // Definindo o status inicial como 'esperando'
    horarioEntrada: new Date(), // Registra o horário de entrada na fila
  };

  filaEspera.enqueue(pessoa); // Adiciona à fila de espera de forma ordenada

  document.getElementById("nome").value = "";
  document.getElementById("cid").value = "";

  mostrarFila();
  alert("Pessoa adicionada à fila!");
}

function mostrarFila() {
  const filaUl = document.getElementById("fila");
  filaUl.innerHTML = "";

  if (filaEspera.isEmpty()) {
    filaUl.innerHTML = "<li>Fila vazia</li>";
    return;
  }

  filaEspera.getItems().forEach((pessoa, index) => {
    const li = document.createElement("li");
    li.textContent = `Posição ${index + 1}: ${pessoa.nome} - ${pessoa.tipoPessoa} - ${pessoa.status}`;
    if (pessoa.cid) {
      li.textContent += ` (CID: ${pessoa.cid})`;
    }
    filaUl.appendChild(li);
  });

  atualizarStatusAtendimento(); // Atualiza o status do próximo atendimento
}

function chamarPessoa() {
  if (filaEspera.isEmpty()) {
    alert("Não há pessoas na fila.");
    return;
  }

  const pessoaChamada = filaEspera.dequeue(); // Remove a pessoa com maior prioridade
  pessoaChamada.status = 'concluído'; // Atualiza o status da pessoa chamada

  // Calcula o tempo de demora na fila
  const horarioSaida = new Date();
  const tempoDemora = Math.floor((horarioSaida - pessoaChamada.horarioEntrada) / 1000); // Tempo em segundos

  // Adiciona o tempo de demora ao objeto da pessoa
  pessoaChamada.tempoDemora = tempoDemora;

  // Adiciona a pessoa chamada à fila de concluídos
  filaConcluidos.enqueue(pessoaChamada);

  // Salva os dados no localStorage
  salvarConcluidosNoLocalStorage(pessoaChamada);

  const statusAtendimento = document.getElementById("atendimentoAtual");
  statusAtendimento.textContent = ` ${pessoaChamada.nome} - ${pessoaChamada.tipoPessoa}`;

  mostrarFila(); // Atualiza a fila de espera na tela
  atualizarStatusAtendimento(); // Atualiza o próximo atendimento
}

function salvarConcluidosNoLocalStorage(pessoa) {
  // Recupera os dados existentes do localStorage ou cria um array vazio
  const concluidos = JSON.parse(localStorage.getItem("filaConcluidos")) || [];

  // Adiciona a nova pessoa à lista de concluídos
  concluidos.push(pessoa);

  // Salva a lista atualizada no localStorage
  localStorage.setItem("filaConcluidos", JSON.stringify(concluidos));
}

function atualizarStatusAtendimento() {
  const proximoAtendimento = filaEspera.peek();
  const proximoAtendimentoElement = document.getElementById("proximoAtendimento");

  // Atualiza o "Próximo Atendimento"
  if (proximoAtendimento) {
    proximoAtendimentoElement.textContent = `${proximoAtendimento.nome} - ${proximoAtendimento.tipoPessoa}`;
  } else {
    proximoAtendimentoElement.textContent = "Nenhum";
  }
}

function mostrarConcluidos() {
  const concluidosUl = document.getElementById("concluidos");
  concluidosUl.innerHTML = "";

  if (filaConcluidos.isEmpty()) {
    concluidosUl.innerHTML = "<li>Nenhum atendimento concluído</li>";
    return;
  }

  filaConcluidos.getItems().forEach((pessoa, index) => {
    const li = document.createElement("li");
    li.textContent = `Atendimento ${index + 1}: ${pessoa.nome} - ${pessoa.tipoPessoa} - ${pessoa.tempoDemora} segundos`;
    if (pessoa.cid) {
      li.textContent += ` (CID: ${pessoa.cid})`;
    }
    concluidosUl.appendChild(li);
  });
}