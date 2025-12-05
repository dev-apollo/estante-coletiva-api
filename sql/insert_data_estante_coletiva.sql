USE estante_coletiva;

INSERT INTO autor (nome, sobrenome) VALUES
('Machado', 'de Assis'),
('Clarice', 'Lispector'),
('J. R. R.', 'Tolkien'),
('George', 'Orwell');

INSERT INTO editora (nome) VALUES
('Companhia das Letras'),
('Rocco'),
('HarperCollins'),
('Editora Record');

INSERT INTO area_conhecimento (nome) VALUES
('Ficção'),
('Fantasia'),
('Filosofia'),
('Tecnologia'),
('História');

INSERT INTO estado (nome, sigla) VALUES
('São Paulo', 'SP'),
('Rio de Janeiro', 'RJ'),
('Minas Gerais', 'MG');

INSERT INTO cidade (nome, estado_id) VALUES
('São Paulo', 1),
('Campinas', 1),
('Rio de Janeiro', 2),
('Belo Horizonte', 3);

INSERT INTO usuario (nome, sobrenome, email, senha, data_cadastro, usuario_status, cidade_id) VALUES
('Ana', 'Silva', 'ana@gmail.com', '123456', '2025-01-10', 'ATIVO', 1),
('Carlos', 'Souza', 'carlos@gmail.com', 'abc123', '2025-01-15', 'ATIVO', 2),
('Marina', 'Oliveira', 'marina@gmail.com', 'senha', '2025-02-01', 'ATIVO', 3),
('João', 'Pereira', 'joao@gmail.com', '1234', '2025-03-01', 'INATIVO', 4);

INSERT INTO mensagem (data_envio, data_visualizacao, texto, remetente_id, destinatario_id) VALUES
(NOW(), NULL, 'Oi, tudo bem?', 1, 2),
(NOW(), NOW(), 'Você ainda tem aquele livro?', 2, 1),
(NOW(), NULL, 'Posso pegar emprestado?', 3, 2);

INSERT INTO avaliacao (nota, descricao, avaliador_id, avaliado_id) VALUES
(5, 'Ótimo usuário, muito gentil.', 1, 2),
(4, 'Livro em bom estado.', 2, 1),
(3, 'Demorou para responder.', 3, 2);

INSERT INTO denuncia (motivo_denuncia, descricao, anexo_evidencia, denunciante_id, denunciado_id) VALUES
('AUSENCIA', 'Usuário não apareceu para entregar o livro.', NULL, 1, 4),
('DIVERGENCIA_PRODUTO', 'Livro veio muito danificado.', 'foto1.jpg', 2, 3),
('COMPORTAMENTO_INADEQUADO', 'Respondeu de forma agressiva.', 'print_chat.png', 3, 2);

INSERT INTO livro (titulo, estado_conservacao, descricao, num_paginas, data_publicacao, livro_status, usuario_id, area_conhecimento_id, editora_id) VALUES
('Dom Casmurro', 'BOM', 'Romance clássico brasileiro.', 256, '1899-01-01', 'DISPONIVEL', 1, 1, 1),
('O Hobbit', 'SEMINOVO', 'A aventura de Bilbo Bolseiro.', 310, '1937-09-21', 'DISPONIVEL', 2, 2, 3),
('1984', 'REGULAR', 'Distopia política.', 328, '1949-06-08', 'DOADO', 2, 1, 4),
('A Hora da Estrela', 'NOVO', 'Último romance de Clarice Lispector.', 87, '1977-10-01', 'DISPONIVEL', 3, 1, 1);

INSERT INTO autor_livro (autor_id, livro_id) VALUES
(1, 1),
(3, 2),
(4, 3),
(2, 4);

INSERT INTO solicitacao (data_solicitacao, data_conclusao, status, usuario_id, livro_id) VALUES
('2025-03-01', NULL, 'PENDENTE', 1, 1),
('2025-03-02', '2025-03-05', 'CONCLUIDA', 2, 2),
('2025-03-10', NULL, 'PENDENTE', 3, 4),
('2025-03-15', '2025-03-18', 'CANCELADA', 2, 3);
