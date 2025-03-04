CREATE DATABASE filaprioridade;
USE filaprioridade;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);
CREATE TABLE feedbacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    prioridade ENUM('comum', 'deficiencia', 'autista', 'idoso', 'gestante', 'lactante', 'crianca_colo', 'obeso', 'mobilidade', 'doador_sangue', 'outro') NOT NULL,
    dataAtendimento DATE NOT NULL,
    profissionais VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL
);
