import { createClient } from "@libsql/client";

export const db = createClient({
  url: process.env.TURSO_DB_URL!,
  authToken: process.env.TURSO_DB_AUTH_TOKEN!,
});

// NÃO rode nada automaticamente aqui
// Esse arquivo deve ficar “puro”

export async function initDB() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS oficios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero INTEGER NOT NULL,
      ano INTEGER NOT NULL,
      processo TEXT NOT NULL,
      interessado TEXT NOT NULL,
      assunto TEXT NOT NULL,
      observacoes TEXT
    );
  `);
}

export async function criarOficio(data: {
  ano: number;
  processo: string;
  interessado: string;
  assunto: string;
  observacoes: string;
}) {
  const result = await db.execute({
    sql: "SELECT numero FROM oficios WHERE ano = ? ORDER BY numero DESC LIMIT 1",
    args: [data.ano],
  });

  const last = result.rows.length > 0 ? Number(result.rows[0].numero) : 0;
  const next = last + 1;

  await db.execute({
    sql: `
      INSERT INTO oficios (numero, ano, processo, interessado, assunto, observacoes)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    args: [
      next,
      data.ano,
      data.processo,
      data.interessado,
      data.assunto,
      data.observacoes,
    ],
  });

  return next;
}

export async function listarOficios() {
  const result = await db.execute(
    "SELECT * FROM oficios ORDER BY ano DESC, numero DESC"
  );
  return result.rows;
}
