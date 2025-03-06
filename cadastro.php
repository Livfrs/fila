<?php
session_start();
$conn = new mysqli("localhost", "root", "", "filaprioridade");

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = trim($_POST["nome"]);
    $email = trim($_POST["email"]);  // Capturando o e-mail
    $senha = $_POST["senha"];
    $confirma_senha = $_POST["confirmar_senha"];

    // Verifica se as senhas coincidem
    if ($senha !== $confirma_senha) {
        die("Erro: As senhas não coincidem.");
    }

    // Verifica se o e-mail é válido
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Erro: O e-mail fornecido não é válido.");
    }

    // Criptografando a senha
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    // Inserir no banco de dados com o e-mail
    $sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $nome, $email, $senha_hash);  // Adicionando o e-mail aqui

    if ($stmt->execute()) {
        header("Location: fila.html");
        exit();

    } else {
        echo "Erro ao cadastrar: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>
