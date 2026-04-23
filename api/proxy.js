const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);

export default function handler(req, res) {
  res.json({ ok: true });
}

module.exports = async (req, res) => {
  // --- MANDATORY CORS HEADERS ---
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all origins (Cocrea, Localhost, etc.)
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle the "pre-flight" check (browsers send this before the actual data)
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  try {
    await client.connect();
    const db = client.db("AppConfig");
    const collection = db.collection("AppConfig");
    const data = await collection.findOne({ "type": "game_config" });

    if (!data) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "AppConfig not found" }));
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  } catch (e) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: e.message }));
  }
};
