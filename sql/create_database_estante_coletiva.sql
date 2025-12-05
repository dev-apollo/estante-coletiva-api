CREATE DATABASE estante_coletiva;
USE estante_coletiva;

CREATE TABLE autor(
	 id INT NOT NULL AUTO_INCREMENT,
     nome VARCHAR(100) NOT NULL,
     sobrenome VARCHAR(100) NOT NULL,
     PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE editora(
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE area_conhecimento(
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE estado(
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sigla VARCHAR(2) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE cidade(
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    estado_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (estado_id) REFERENCES estado(id)
		ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE usuario(
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    data_cadastro DATE NOT NULL,
    usuario_status ENUM("ATIVO", "INATIVO") NOT NULL,
    cidade_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (cidade_id) REFERENCES cidade(id)
		ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE mensagem(
	id INT NOT NULL AUTO_INCREMENT,
    data_envio TIMESTAMP NOT NULL,
    data_visualizacao TIMESTAMP,
    texto VARCHAR(255) NOT NULL,
    remetente_id INT NOT NULL,
    destinatario_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (remetente_id) REFERENCES usuario(id)
		ON UPDATE CASCADE
        ON DELETE RESTRICT,
	FOREIGN KEY (destinatario_id) REFERENCES usuario(id)
		ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE avaliacao(
	id INT NOT NULL AUTO_INCREMENT,
	nota INT NOT NULL,
    descricao VARCHAR(255),
    avaliador_id INT NOT NULL,
    avaliado_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (avaliador_id) REFERENCES usuario(id)
		ON UPDATE CASCADE
        ON DELETE RESTRICT,
	FOREIGN KEY (avaliado_id) REFERENCES usuario(id)
		ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE denuncia(
	id INT NOT NULL AUTO_INCREMENT,
    motivo_denuncia ENUM("AUSENCIA", "DIVERGENCIA_PRODUTO", "COMPORTAMENTO_INADEQUADO", "OUTRO") NOT NULL,
    descricao TEXT NOT NULL,
    anexo_evidencia VARCHAR(100),
    denunciante_id INT NOT NULL,
    denunciado_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (denunciante_id) REFERENCES usuario(id)
		ON UPDATE CASCADE
        ON DELETE RESTRICT,
	FOREIGN KEY (denunciado_id) REFERENCES usuario(id)
		ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE livro(
	id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    estado_conservacao ENUM("NOVO", "SEMINOVO", "BOM", "REGULAR") NOT NULL,
    descricao TEXT NOT NULL,
    num_paginas INT NOT NULL,
    data_publicacao DATE NOT NULL,
    livro_status ENUM("DISPONIVEL", "DOADO") NOT NULL,
    usuario_id INT NOT NULL,
    area_conhecimento_id INT NOT NULL,
    editora_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
		ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (area_conhecimento_id) REFERENCES area_conhecimento(id)
		ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (editora_id) REFERENCES editora(id)
		ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE solicitacao(
	id INT NOT NULL AUTO_INCREMENT,
    data_solicitacao DATE NOT NULL,
    data_conclusao DATE,
    status ENUM("PENDENTE", "CONCLUIDA", "CANCELADA") NOT NULL,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
		ON UPDATE CASCADE
        ON DELETE RESTRICT,
	FOREIGN KEY (livro_id) REFERENCES livro(id)
		ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;