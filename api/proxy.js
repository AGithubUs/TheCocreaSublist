export default async function handler(req, res) {
  const MONGODB_API_KEY = process.env.MONGODB_API_KEY;
  const DATA_API_URL = "https://mongodb-api.com";

  // Forward the request to MongoDB
  const response = await fetch(DATA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': MONGODB_API_KEY,
    },
    body: JSON.stringify(req.body), // Pass the query from Cocrea to MongoDB
  });

  const data = await response.json();
  res.status(200).json(data);
}
