import { NextResponse } from "next/server";
import { criarOficio, listarOficios } from "@/lib/db";

export async function GET() {
  const dados = listarOficios();
  return NextResponse.json(dados);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const novoNumero = criarOficio({
      ano: body.ano,
      processo: body.processo,
      interessado: body.interessado,
      assunto: body.assunto,
      observacoes: body.observacoes,
    });

    return NextResponse.json({ sucesso: true, numero: novoNumero });
  } catch (e) {
    return NextResponse.json({ erro: "Erro ao criar ofício" }, { status: 500 });
  }
}
