CREATE DATABASE IF NOT EXISTS app_modelo_react
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE app_modelo_react;

CREATE TABLE IF NOT EXISTS tb_cad_usuario (
  codigo INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  usuario VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefone VARCHAR(100) NOT NULL,
  endereco VARCHAR(200) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (codigo),
  UNIQUE KEY IDX_tb_cad_usuario_email (email),
  UNIQUE KEY IDX_tb_cad_usuario_usuario (usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS token (
  id INT NOT NULL AUTO_INCREMENT,
  hash VARCHAR(512) NOT NULL,
  email VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UQ_token_email (email),
  KEY IDX_token_hash (hash),
  CONSTRAINT FK_token_usuario_email
    FOREIGN KEY (email)
    REFERENCES tb_cad_usuario (email)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tb_cad_clientes (
  codigo INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefone VARCHAR(100) NOT NULL,
  cpf_cnpj VARCHAR(20) NOT NULL,
  endereco VARCHAR(200) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  cep VARCHAR(20) NOT NULL,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (codigo),
  UNIQUE KEY IDX_tb_cad_clientes_email (email),
  UNIQUE KEY IDX_tb_cad_clientes_cpf_cnpj (cpf_cnpj)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;