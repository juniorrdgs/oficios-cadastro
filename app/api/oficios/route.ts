import { initDB, criarOficio, listarOficios } from "../../../lib/db";

export async function GET() {
  await initDB();
  const items = await listarOficios();
  return Response.json(items);
}

export async function POST(req: Request) {
  await initDB();
  const body = await req.json();
  const numero = await criarOficio(body);
  return Response.json({ sucesso: true, numero });
}
