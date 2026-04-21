export default async function handler(req, res) {
  const MONGODB_API_KEY = process.env.MONGODB_API_KEY;
  const DATA_API_URL = "https://mongodb-api.com";

  const response = await fetch(DATA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': MONGODB_API_KEY,
    },
    body: JSON.stringify({
      dataSource: "Cluster0",
      database: "AppConfig",
      collection: "AppConfig",
      filter: { "type": "game_config" } // Grabs your one configuration document
    }),
  });

  const data = await response.json();
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.status(200).json(data.document); // Sends just the document, not the wrapper
}
