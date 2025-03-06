document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    let identificacao = document.getElementById("identificacao").value.trim();
    let mensagem = document.getElementById("mensagem").value.trim();

    if (identificacao === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos.");
        event.preventDefault();
        return;
    }

    alert("Feedback enviado com sucesso!");
});
