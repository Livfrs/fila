<?php
session_start();
$conn = new mysqli("localhost", "root", "", "filaprioridade");

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = trim($_POST["nome"]);
    $prioridade = $_POST["prioridade"];
    $dataAtendimento = $_POST["dataAtendimento"];
    $profissionais = trim($_POST["profissionais"]);
    $mensagem = trim($_POST["mensagem"]);

    // Verifica se todos os campos estão preenchidos
    if (empty($nome) || empty($prioridade) || empty($dataAtendimento) || empty($profissionais) || empty($mensagem)) {
        die("Erro: Todos os campos devem ser preenchidos.");
    }

    // Inserir no banco de dados
    $sql = "INSERT INTO feedbacks (nome, prioridade, dataAtendimento, profissionais, mensagem) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $nome, $prioridade, $dataAtendimento, $profissionais, $mensagem);

    if ($stmt->execute()) {
        echo "Feedback enviado com sucesso!";
    } else {
        echo "Erro ao enviar feedback: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>
