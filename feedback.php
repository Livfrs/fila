<?php
$conn = new mysqli("localhost", "root", "", "filaprioridade");

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $identificacao = trim($_POST["identificacao"]);
    $mensagem = trim($_POST["mensagem"]);

    // Evita SQL Injection
    $identificacao = $conn->real_escape_string($identificacao);
    $mensagem = $conn->real_escape_string($mensagem);

    $sql = "INSERT INTO feedbacks (identificacao, mensagem) VALUES ('$identificacao', '$mensagem')";

    if ($conn->query($sql) === TRUE) {
        header("Location: visualizar_feedback.php");
        exit();
    } else {
        echo "Erro ao enviar feedback: " . $conn->error;
    }
}

$conn->close();
?>
