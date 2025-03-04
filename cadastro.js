function validarCadastro() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();  // Usando .trim() para evitar problemas com espaços
    const confirmaSenha = document.getElementById("confirmar_senha").value.trim(); // Consistência nos nomes de variáveis

    // Verifica se todos os campos estão preenchidos
    if (nome === "" || email === "" || senha === "" || confirmaSenha === "") {
        alert("Todos os campos devem ser preenchidos!");
        return false;
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem!");
        return false;
    }

    // Verifica se o e-mail é válido e termina com @gmail.com
    if (!email.endsWith("@gmail.com")) {
        alert("O e-mail deve ser no formato @gmail.com");
        return false;
    }

    return true;
}
