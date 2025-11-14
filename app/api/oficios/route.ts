import { db } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await db.execute("SELECT * FROM oficios ORDER BY id DESC");
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { numero_processo, interessado, assunto, observacoes } = body;

  await db.execute({
    sql: `
      INSERT INTO oficios (numero_processo, interessado, assunto, observacoes)
      VALUES (?, ?, ?, ?)
    `,
    args: [numero_processo, interessado, assunto, observacoes],
  });

  return NextResponse.json({ message: "Ofício registrado com sucesso" });
}
