document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault();
    

    let nome = document.getElementById("nome").value.trim();
    let identificacao = document.getElementById("identificacao").value.trim();
    let dataAtendimento = document.getElementById("dataAtendimento").value;
    let tempoEspera = document.getElementById("tempoEspera").value.trim();
    let profissionais = document.getElementById("profissionais").value.trim();
    let comentario = document.getElementById("comentario").value.trim();
    
    if (nome === "" || identificacao === "" || dataAtendimento === "" || tempoEspera === "" || profissionais === "" || comentario === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    
    let registroData = {
        nome: nome,
        identificacao: identificacao,
        dataAtendimento: dataAtendimento,
        tempoEspera: tempoEspera,
        profissionais: profissionais,
        comentario: comentario
    };
    
    // Simulando envio para um servidor (apenas armazenando localmente)
    let registro = JSON.parse(localStorage.getItem("registro")) || [];
    registro.push(registroData);
    localStorage.setItem("registro", JSON.stringify(registro));
    
    alert("Registro enviado com sucesso!");
    document.getElementById("registroForm").reset();
    document.getElementById("mensagem").style.display = "block";
});
