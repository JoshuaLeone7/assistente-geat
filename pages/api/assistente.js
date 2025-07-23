export default async function handler(req, res) {
  const { pergunta } = req.body;

  const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: pergunta }],
      temperature: 0.7
    })
  });

  const data = await resposta.json();

  if (data.choices && data.choices.length > 0) {
    res.status(200).json({ resultado: data.choices[0].message.content.trim() });
  } else {
    res.status(500).json({ resultado: "Erro ao obter resposta da OpenAI." });
  }
}
