<?php
$servidor = "localhost";
$usuario = "root"; // ou outro usuário do banco
$senha = ""; // senha do MySQL, geralmente vazia no XAMPP
$banco = "filaprioridade"; // Nome do banco de dados

// Criando a conexão
$conn = new mysqli($servidor, $usuario, $senha, $banco);

// Verificando a conexão
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}
?>

