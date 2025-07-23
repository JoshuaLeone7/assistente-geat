import { useState } from "react";

export default function Home() {
  const [pergunta, setPergunta] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const enviarPergunta = async () => {
    if (!pergunta) return;
    const novaPergunta = { tipo: "user", texto: pergunta };
    setMensagens([...mensagens, novaPergunta]);
    setCarregando(true);
    setPergunta("");

    const res = await fetch("/api/assistente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pergunta }),
    });

    const data = await res.json();
    const novaResposta = { tipo: "ia", texto: data.resultado };
    setMensagens((prev) => [...prev, novaResposta]);
    setCarregando(false);
  };

  return (
    <main style={{
      backgroundColor: '#0d1117',
      color: '#e6edf3',
      height: '100vh',
      padding: '1rem',
      fontFamily: 'Segoe UI, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h1 style={{ marginBottom: '1rem' }}>🧠 Assistente GEAT</h1>
      <div style={{
        flexGrow: 1,
        overflowY: 'auto',
        backgroundColor: '#161b22',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1rem'
      }}>
        {mensagens.map((msg, i) => (
          <div key={i} style={{
            backgroundColor: msg.tipo === "user" ? "#238636" : "#30363d",
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '0.5rem',
            alignSelf: msg.tipo === "user" ? "flex-end" : "flex-start",
            maxWidth: "80%"
          }}>
            <span>{msg.texto}</span>
          </div>
        ))}
        {carregando && (
          <div style={{
            backgroundColor: "#30363d",
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '0.5rem',
            maxWidth: "80%"
          }}>
            <span>⏳ Pensando...</span>
          </div>
        )}
      </div>
      <div style={{ display: "flex" }}>
        <textarea
          rows={2}
          value={pergunta}
          placeholder="Digite sua dúvida técnica..."
          onChange={(e) => setPergunta(e.target.value)}
          style={{
            flexGrow: 1,
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #30363d",
            backgroundColor: "#0d1117",
            color: "#e6edf3"
          }}
        />
        <button onClick={enviarPergunta} style={{
          marginLeft: '0.5rem',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          backgroundColor: '#238636',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}>
          Enviar
        </button>
      </div>
    </main>
  );
}
