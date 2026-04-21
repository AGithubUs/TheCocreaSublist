const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

module.exports = async (req, res) => {
  // CORS headers so Cocrea can access it
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  try {
    await client.connect();
    const db = client.db("AppConfig");
    const collection = db.collection("AppConfig");

    // Grabs the version, authorized places, and users
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
