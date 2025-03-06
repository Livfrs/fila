<?php
$conn = new mysqli("localhost", "root", "", "filaprioridade");

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Limpando os valores com trim() antes de armazená-los
    
    $nome = trim($_POST["nome"]);
    $identificacao = trim($_POST["identificacao"]);
    $prioridade = trim($_POST["prioridade"]);
    $dataAtendimento = trim($_POST["dataAtendimento"]);
    $profissionais = trim($_POST["profissionais"]);
    $mensagem = trim($_POST["mensagem"]);

    // Proteção contra SQL Injection
  
    $nome = $conn->real_escape_string($nome);
    $identificacao = $conn->real_escape_string($identificacao);
    $prioridade = $conn->real_escape_string($prioridade);
    $dataAtendimento = $conn->real_escape_string($dataAtendimento);
    $profissionais = $conn->real_escape_string($profissionais);
    $mensagem = $conn->real_escape_string($mensagem);

    $sql = "INSERT INTO registros (nome,identificacao, prioridade, dataAtendimento, profissionais, mensagem) 
            VALUES ( '$nome','$identificacao','$prioridade', '$dataAtendimento', '$profissionais', '$mensagem')";

    if ($conn->query($sql) === TRUE) {
        header("Location: visualizar_registro.php");
        exit();
    } else {
        echo "Erro ao registrar: " . $conn->error;
    }
}

$conn->close();
?>
