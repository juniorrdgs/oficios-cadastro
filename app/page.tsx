"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [oficios, setOficios] = useState([]);
  const [form, setForm] = useState({
    numero_processo: "",
    interessado: "",
    assunto: "",
    observacoes: "",
  });

  const load = async () => {
    const res = await fetch("/api/oficios");
    setOficios(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/oficios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      numero_processo: "",
      interessado: "",
      assunto: "",
      observacoes: "",
    });

    load();
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Sistema de Controle de Ofícios</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Número do processo"
          value={form.numero_processo}
          onChange={(e) => setForm({ ...form, numero_processo: e.target.value })}
        />
        <input
          placeholder="Interessado"
          value={form.interessado}
          onChange={(e) => setForm({ ...form, interessado: e.target.value })}
        />
        <input
          placeholder="Assunto"
          value={form.assunto}
          onChange={(e) => setForm({ ...form, assunto: e.target.value })}
        />
        <textarea
          placeholder="Observações"
          value={form.observacoes}
          onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
        />

        <button type="submit">Registrar Ofício</button>
      </form>

      <h2>Ofícios Registrados</h2>

      {oficios.map((o) => (
        <div key={o.id} style={{ padding: 10, marginBottom: 10, border: "1px solid #ccc" }}>
          <strong>Ofício nº {o.id}</strong>
          <p><b>Processo:</b> {o.numero_processo}</p>
          <p><b>Interessado:</b> {o.interessado}</p>
          <p><b>Assunto:</b> {o.assunto}</p>
          <p><b>Observações:</b> {o.observacoes}</p>
        </div>
      ))}
    </div>
  );
}
