// Função para carregar os atendimentos concluídos do localStorage
function carregarConcluidos() {
    const tbody = document.querySelector("#concluidosTable tbody");
    tbody.innerHTML = ""; // Limpa a tabela antes de carregar os dados
  
    // Recupera os dados da fila de concluídos do localStorage
    const filaConcluidos = JSON.parse(localStorage.getItem("filaConcluidos")) || [];
  
    // Adiciona cada atendimento concluído à tabela
    filaConcluidos.forEach((atendimento) => {
      const row = document.createElement("tr");
  
      // Nome
      const nomeCell = document.createElement("td");
      nomeCell.textContent = atendimento.nome;
      row.appendChild(nomeCell);
  
      // Prioridade
      const prioridadeCell = document.createElement("td");
      prioridadeCell.textContent = atendimento.tipoPessoa;
      row.appendChild(prioridadeCell);
  
      // Tempo na Fila
      const tempoCell = document.createElement("td");
      tempoCell.textContent = `${atendimento.tempoDemora} segundos`;
      row.appendChild(tempoCell);
  
      tbody.appendChild(row);
    });
  }
  
  // Carrega os dados ao abrir a página
  document.addEventListener("DOMContentLoaded", carregarConcluidos);