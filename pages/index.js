import { useState } from "react";

export default function Home() {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleEnviar = async () => {
    if (!pergunta) return;
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
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: 700, margin: "0 auto" }}>
      <h1>Assistente de Comissionamento GEAT</h1>
      <p>Digite sua pergunta técnica e receba a resposta da IA:</p>

      <textarea
        rows={4}
        placeholder="Ex: Quais os critérios para energizar uma subestação rural?"
        value={pergunta}
        onChange={(e) => setPergunta(e.target.value)}
        style={{ width: "100%", padding: "1rem", marginBottom: "1rem", borderRadius: 8, border: "1px solid #ccc" }}
      />

      <button onClick={handleEnviar} disabled={carregando} style={{ padding: "0.5rem 1rem" }}>
        {carregando ? "🔄 Processando..." : "Enviar"}
      </button>

      {resposta && (
        <div style={{ marginTop: "2rem", background: "#f9f9f9", padding: "1rem", borderRadius: 8 }}>
          <strong>Resposta da IA:</strong>
          <p>{resposta}</p>
        </div>
      )}
    </main>
  );
}
