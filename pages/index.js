import { useState } from "react";

export default function Home() {
  const [resposta, setResposta] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handlePergunta = async (pergunta) => {
    setCarregando(true);
    setResposta("");

    const res = await fetch("/api/assistente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pergunta }),
    });

    const data = await res.json();
    setResposta(data.resultado);
    setCarregando(false);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Assistente de Comissionamento GEAT</h1>
      <p>Escolha uma ação abaixo:</p>

      <button onClick={() => handlePergunta("Explique o script de religador")} style={{ marginRight: 10 }}>
        📄 Explicar Script
      </button>
      <button onClick={() => handlePergunta("Gerar checklist de disjuntor")}>
        ✅ Gerar Checklist
      </button>

      {carregando && <p>🔄 Processando...</p>}
      {resposta && (
        <div style={{ marginTop: "1rem", background: "#f0f0f0", padding: "1rem", borderRadius: 8 }}>
          <strong>Resposta:</strong>
          <p>{resposta}</p>
        </div>
      )}
    </main>
  );
}
