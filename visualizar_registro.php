<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Histórico dos Registros</title>
    <link rel="stylesheet" href="visualizar_registro.css">
</head>
<body>
    <div class="container3">
        <h1>Histórico dos Registros</h1>
        <div class="registro-list">
            <?php
            $conn = new mysqli("localhost", "root", "", "filaprioridade");

            if ($conn->connect_error) {
                die("Erro de conexão: " . $conn->connect_error);
            }

            $sql = "SELECT * FROM registros ORDER BY dataAtendimento DESC";
            $result = $conn->query($sql);
            
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo "<div class='registro-item'>";

                    echo "<h3><strong> </strong> " . htmlspecialchars($row["nome"]) . "</h3>";
                    echo "<p><strong>ID </strong> " . htmlspecialchars($row["identificacao"]) . "<p>";
                    echo "<p><strong>Prioridade:</strong> " . htmlspecialchars($row["prioridade"]) . "</p>";
                    echo "<p><strong>Data do Atendimento:</strong> " . htmlspecialchars($row["dataAtendimento"]) . "</p>";
                    echo "<p><strong>Profissionais Envolvidos:</strong> " . htmlspecialchars($row["profissionais"]) . "</p>";
                    echo "<p><strong>Informações:</strong> " . nl2br(htmlspecialchars($row["mensagem"])) . "</p>";
                    echo "</div>";
                }
            } else {
                echo '<p id="mensagem-erro">Nenhum registro encontrado.</p>';
                
            }
            $conn->close();
            ?>
            <a href="fila.html" class="back-button">Voltar para a Fila</a>
        </div>
    </div>
</body>
</html>
