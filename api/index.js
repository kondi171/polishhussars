// api/index.js
export default async function handler(req, res) {
  const { tag } = req.query;

  if (!tag) return res.status(400).json({ error: "Brak tagu" });

  try {
    const response = await fetch(
      `https://api.clashofclans.com/v1/clans/${encodeURIComponent(tag)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.COC_API_TOKEN}`,
          Accept: "application/json",
        },
      },
    );

    const data = await response.json();

    // Zwracamy całość – bez żadnego filtrowania
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
