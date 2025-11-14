"use client";

import { useState } from "react";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [ano, setAno] = useState(currentYear);
  const [form, setForm] = useState({
    processo: "",
    interessado: "",
    assunto: "",
    observacoes: ""
  });

  async function enviar() {
    const resp = await fetch("/api/oficios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ano, ...form }),
    });

    const data = await resp.json();
    if (data.sucesso) {
      alert(`Ofício nº ${data.numero}/${ano} cadastrado!`);
    } else {
      alert("Erro ao cadastrar");
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-6">Cadastro de Ofícios</h1>

      <div className="mb-6">
        <p className="font-semibold mb-2">Selecione o ano:</p>

        <div className="flex gap-4">
          {[currentYear - 1, currentYear, currentYear + 1].map((y) => (
            <label key={y} className="flex items-center gap-2">
              <input
                type="radio"
                name="ano"
                value={y}
                checked={ano === y}
                onChange={() => setAno(y)}
              />
              {y}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <input className="input" placeholder="Número do processo"
          value={form.processo}
          onChange={(e) => setForm({ ...form, processo: e.target.value })}
        />

        <input className="input" placeholder="Interessado"
          value={form.interessado}
          onChange={(e) => setForm({ ...form, interessado: e.target.value })}
        />

        <input className="input" placeholder="Assunto"
          value={form.assunto}
          onChange={(e) => setForm({ ...form, assunto: e.target.value })}
        />

        <textarea className="input h-24" placeholder="Observações"
          value={form.observacoes}
          onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
        />
      </div>

      <button
        onClick={enviar}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Cadastrar
      </button>
    </div>
  );
}
