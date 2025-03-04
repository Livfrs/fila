<?php
session_start();
$conn = new mysqli("localhost", "root", "", "filaprioridade");

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $senha = $_POST["senha"];

    // Buscando usuário pelo e-mail
    $sql = "SELECT id, nome, senha FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Verifica a senha usando password_verify()
        if (password_verify($senha, $user["senha"])) {
            $_SESSION["usuario"] = $user["nome"];
            header("Location: fila.html");
            exit();
        } else {
            echo "Senha incorreta.";
        }
    } else {
        echo "E-mail não encontrado.";
    }

    $stmt->close();
}
$conn->close();
?>
