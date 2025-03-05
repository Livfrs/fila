<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Histórico Detalhado</title>
    <link rel="stylesheet" href="visualizar_form.css">
</head>
<body>
    <div class="container3">
        <h1>Histórico Detalhado</h1>
        <div class="feedback-list">
            <?php
            $conn = new mysqli("localhost", "root", "", "filaprioridade");
            if ($conn->connect_error) {
                die("Erro de conexão: " . $conn->connect_error);
            }

            $sql = "SELECT * FROM feedbacks ORDER BY dataAtendimento DESC";
            $result = $conn->query($sql);
            
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo "<div class='feedback-item'>";
                    echo "<h3>" . htmlspecialchars($row["nome"]) . "</h3>";
                    echo "<p><strong>Prioridade:</strong> " . htmlspecialchars($row["prioridade"]) . "</p>";
                    echo "<p><strong>Data do Atendimento:</strong> " . htmlspecialchars($row["dataAtendimento"]) . "</p>";
                    echo "<p><strong>Profissionais Envolvidos:</strong> " . htmlspecialchars($row["profissionais"]) . "</p>";
                    echo "<p><strong>Feedback:</strong> " . nl2br(htmlspecialchars($row["mensagem"])) . "</p>";
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