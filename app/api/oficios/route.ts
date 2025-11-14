import { initDB, criarOficio, listarOficios } from "../../../lib/db";

export async function GET() {
  await initDB(); // 👍 correto

  const data = await listarOficios();
  return Response.json(data);
}

export async function POST(req: Request) {
  await initDB(); // 👍 correto

  const body = await req.json();
  const numero = await criarOficio(body);

  return Response.json({ sucesso: true, numero });
}
