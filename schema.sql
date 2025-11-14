CREATE TABLE IF NOT EXISTS oficios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  numero_processo TEXT NOT NULL,
  interessado TEXT NOT NULL,
  assunto TEXT NOT NULL,
  observacoes TEXT
);
