import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  try {
    await client.connect();
    const database = client.db("GameData");
    const collection = database.collection("AppConfig");

    // Grabs your one configuration document
    const config = await collection.findOne({ "type": "game_config" });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
