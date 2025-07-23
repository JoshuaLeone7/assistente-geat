export default async function handler(req, res) {
  const { pergunta } = req.body;

  const respostaFicticia = {
    "Explique o script de religador": "Um script de religador contém comandos para sequência de rearmes e lógicas de proteção em redes de distribuição.",
    "Gerar checklist de disjuntor": "Checklist gerado: 1) Verificar isolamento, 2) Testar bobina de abertura, 3) Confirmar comunicação SCADA."
  };

  res.status(200).json({ resultado: respostaFicticia[pergunta] || "Função em desenvolvimento." });
}
