document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let nome = document.getElementById("nome").value.trim();
    let dataAtendimento = document.getElementById("dataAtendimento").value;
    let tempoEspera = document.getElementById("tempoEspera").value.trim();
    let profissionais = document.getElementById("profissionais").value.trim();
    let comentario = document.getElementById("comentario").value.trim();
    
    if (nome === "" || dataAtendimento === "" || tempoEspera === "" || profissionais === "" || comentario === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    
    let feedbackData = {
        nome: nome,
        dataAtendimento: dataAtendimento,
        tempoEspera: tempoEspera,
        profissionais: profissionais,
        comentario: comentario
    };
    
    // Simulando envio para um servidor (apenas armazenando localmente)
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push(feedbackData);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    
    alert("Feedback enviado com sucesso!");
    document.getElementById("feedbackForm").reset();
    document.getElementById("mensagem").style.display = "block";
});
