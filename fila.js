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

    // Ajustando a prioridade para idosos com mais de 80 anos e crianças de até 1 ano
    if (element.tipoPessoa === "idoso" && element.maisDe80 === "sim") {
      element.prioridade = 3; // Prioridade máxima para idosos com mais de 80 anos
    } else if (element.tipoPessoa === "crianca_colo" && element.criancaAte1Ano === "sim") {
      element.prioridade = 3; // Prioridade máxima para crianças de até 1 ano
    } else {
      element.prioridade = prioridades[element.tipoPessoa];
    }

    // Inserindo a pessoa na fila de acordo com a prioridade
    let inserido = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].prioridade < element.prioridade) {
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

  atualizarPrioridades() {
    const TEMPO_LIMITE = 240 * 1000; // 60 segundos em milissegundos
    const agora = new Date();

    // Atualiza a prioridade de quem está há mais de 240 segundos na fila
    this.items.forEach((pessoa) => {
      const tempoEspera = agora - pessoa.horarioEntrada;
      if (tempoEspera > TEMPO_LIMITE) {
        pessoa.prioridade = 4; // Prioridade máxima para quem esperou mais de 240 segundos
      }
    });
    //Segundo a legislação o tempo limite deve ser de 40 minutos, mas para testes de funcionalidades mais rápido, o tempo limite escolhido foi 4 minutos (240 segundos)

    // Reordena a fila com base nas novas prioridades
    this.items.sort((a, b) => b.prioridade - a.prioridade);
  }
}

// Criando uma instância da fila de espera
const filaEspera = new Queue();

// Criando uma instância da fila de concluídos
const filaConcluidos = new Queue();

function mostrarPerguntasAdicionais() {
  const tipoPessoa = document.getElementById("tipoPessoa").value;
  const perguntasAdicionais = document.getElementById("perguntasAdicionais");
  const perguntaIdoso = document.getElementById("perguntaIdoso");
  const perguntaCriancaColo = document.getElementById("perguntaCriancaColo");
  const cidInput = document.getElementById("cidInput");

  if (tipoPessoa === "idoso") {
    perguntasAdicionais.style.display = "block";
    perguntaIdoso.style.display = "block";
    perguntaCriancaColo.style.display = "none";
    cidInput.style.display = "none"; // Oculta o campo do CID
  } else if (tipoPessoa === "crianca_colo") {
    perguntasAdicionais.style.display = "block";
    perguntaIdoso.style.display = "none";
    perguntaCriancaColo.style.display = "block";
    cidInput.style.display = "none"; // Oculta o campo do CID
  } else if (tipoPessoa === "outro") {
    perguntasAdicionais.style.display = "none"; // Oculta as perguntas adicionais
    cidInput.style.display = "block"; // Exibe o campo do CID
  } else {
    perguntasAdicionais.style.display = "none";
    cidInput.style.display = "none"; // Oculta o campo do CID
  }
}

function adicionarFila() {
  const nome = document.getElementById("nome").value;
  const tipoPessoa = document.getElementById("tipoPessoa").value;
  const cid = document.getElementById("cid").value;
  const maisDe80 = document.querySelector('input[name="maisDe80"]:checked')?.value || "nao";
  const criancaAte1Ano = document.querySelector('input[name="criancaAte1Ano"]:checked')?.value || "nao";

  if (nome === "") {
    alert("Por favor, insira o id!");
    return;
  }

  // Validação do CID apenas para o tipo "Outro"
  if (tipoPessoa === "outro" && cid === "") {
    alert("Por favor, insira o CID!");
    return;
  }

  const pessoa = {
    nome,
    tipoPessoa,
    cid: tipoPessoa === "outro" ? cid : "", // Armazena o CID apenas se for "Outro"
    maisDe80: tipoPessoa === "idoso" ? maisDe80 : "nao",
    criancaAte1Ano: tipoPessoa === "crianca_colo" ? criancaAte1Ano : "nao",
    status: 'esperando', // Definindo o status inicial como 'esperando'
    horarioEntrada: new Date(), // Registra o horário de entrada na fila
  };

  filaEspera.enqueue(pessoa); // Adiciona à fila de espera de forma ordenada

  // Limpa os campos após adicionar à fila
  document.getElementById("nome").value = "";
  document.getElementById("cid").value = "";
  document.querySelectorAll('input[type="radio"]').forEach((radio) => (radio.checked = false));

  mostrarFila();
  alert("Pessoa adicionada à fila!");
}

function mostrarFila() {
  const filaUl = document.getElementById("fila");
  filaUl.innerHTML = "";

  // Atualiza as prioridades antes de exibir a fila
  filaEspera.atualizarPrioridades();

  if (filaEspera.isEmpty()) {
    filaUl.innerHTML = "<li>Fila vazia</li>";
    return;
  }

  filaEspera.getItems().forEach((pessoa, index) => {
    const li = document.createElement("li");
    
    // Substituindo o tipoPessoa "crianca_colo" por "Criança de Colo"
    let tipoPessoaDisplay = pessoa.tipoPessoa;
    if (tipoPessoaDisplay === "crianca_colo") {
      tipoPessoaDisplay = "Criança de Colo";
    }
    
    li.textContent = `Posição ${index + 1}: ${pessoa.nome} - ${tipoPessoaDisplay} - ${pessoa.status}`;
    
    if (pessoa.cid) {
      li.textContent += ` (CID: ${pessoa.cid})`;
    }
    if (pessoa.tipoPessoa === "idoso" && pessoa.maisDe80 === "sim") {
      li.textContent += " (80+ anos)";
    }
    if (pessoa.tipoPessoa === "crianca_colo" && pessoa.criancaAte1Ano === "sim") {
      li.textContent += " (Criança até 1 ano)";
    }
    
    // Mostra o tempo de espera
    const tempoEspera = Math.floor((new Date() - pessoa.horarioEntrada) / 1000); // Tempo em segundos
    li.textContent += ` - Espera: ${tempoEspera} segundos`;
    
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

  // Verifica e substitui "crianca_colo" por "Criança de Colo"
  let tipoPessoaDisplay = pessoaChamada.tipoPessoa;
  if (tipoPessoaDisplay === "crianca_colo") {
    tipoPessoaDisplay = "Criança de Colo";
  }

  statusAtendimento.textContent = `${pessoaChamada.nome} - ${tipoPessoaDisplay}`;

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

  // Verifica se o próximo atendimento existe e substitui "crianca_colo" por "Criança de Colo"
  if (proximoAtendimento) {
    let tipoPessoaDisplay = proximoAtendimento.tipoPessoa;
    if (tipoPessoaDisplay === "crianca_colo") {
      tipoPessoaDisplay = "Criança de Colo";
    }
    proximoAtendimentoElement.textContent = `${proximoAtendimento.nome} - ${tipoPessoaDisplay}`;
  } else {
    proximoAtendimentoElement.textContent = "Nenhum";
  }
}


function mostrarConcluidos() {
  const concluidosUl = document.getElementById("concluidos");
  concluidosUl.innerHTML = "";

  // Recupera os dados do localStorage
  const concluidos = JSON.parse(localStorage.getItem("filaConcluidos")) || [];

  if (concluidos.length === 0) {
    concluidosUl.innerHTML = "<li>Nenhum atendimento concluído</li>";
    return;
  }

  concluidos.forEach((pessoa, index) => {
    const li = document.createElement("li");
    li.textContent = `Atendimento ${index + 1}: ${pessoa.nome} - ${pessoa.tipoPessoa} - ${pessoa.tempoDemora} segundos`;
    if (pessoa.cid) {
      li.textContent += ` (CID: ${pessoa.cid})`;
    }
    if (pessoa.tipoPessoa === "idoso" && pessoa.maisDe80 === "sim") {
      li.textContent += " (80+ anos)";
    }
    if (pessoa.tipoPessoa === "crianca_colo" && pessoa.criancaAte1Ano === "sim") {
      li.textContent += " (Criança até 1 ano)";
    }
    concluidosUl.appendChild(li);
  });

  // Exibe o contêiner de concluídos
  document.getElementById("concluidosContainer").style.display = "block";
}