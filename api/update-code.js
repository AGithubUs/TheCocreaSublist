import clientPromise from "../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { play_code } = req.body;

  const client = await clientPromise;
  const db = client.db("your_db");

  const result = await db.collection("config").updateOne(
    { type: "game_config" },
    { $set: { play_code } }
  );

  res.json({
    success: true,
    matched: result.matchedCount,
    updated: result.modifiedCount
  });
}
