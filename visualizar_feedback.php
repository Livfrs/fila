<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Histórico dos Feedbacks</title>
    <link rel="stylesheet" href="visualizar_registro.css">
</head>
<body>
    <div class="container3">
        <h1>Histórico dos Feedbacks</h1>
        <div class="feedback-list">
        <?php
        $conn = new mysqli("localhost", "root", "", "filaprioridade");

        if ($conn->connect_error) {
            die("Erro de conexão: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM feedbacks ORDER BY dataEnvio DESC";
        $result = $conn->query($sql);

        // Verificar se a consulta retornou um erro
        if ($result === false) {
            echo "Erro na consulta SQL: " . $conn->error;
            exit();
        }

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<div class='registro-item'>";
                echo "<h3>" . htmlspecialchars($row["identificacao"]) . "</h3>";
                echo "<p><strong>Feedback:</strong> " . nl2br(htmlspecialchars($row["mensagem"])) . "</p>";
                echo "<p><strong>Data do Envio:</strong> " . htmlspecialchars($row["dataEnvio"]) . "</p>";
                echo "</div>";
            }
        } else {
            echo "<p>Nenhum feedback encontrado.</p>";
        }

        $conn->close();
        ?>

            <a href="fila.html" class="back-button">Voltar para a Fila</a>
        </div>
    </div>
</body>
</html>
