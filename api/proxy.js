import { MongoClient } from 'mongodb';

// We define the client outside the handler to reuse the connection
const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  // Add CORS headers so Cocrea can talk to it
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await client.connect();
    const db = client.db("AppConfig"); // Your database name
    const collection = db.collection("AppConfig"); // Your collection name

    const data = await collection.findOne({ "type": "game_config" });

    if (!data) {
      return res.status(404).json({ error: "Config document not found in MongoDB" });
    }

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
