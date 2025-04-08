import { MongoClient } from "mongodb";

const uri = process.env.DB_HOST;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db("myrole"); // explicitly use the correct DB name
      const collection = db.collection("test_result"); // your collection is "user"
      const data = await collection.find({}).toArray();

      res.status(200).json(data);
      await client.close();
    } catch (error) {
      console.error("MongoDB connection error:", error.message);
      res.status(500).json({
        error: "Failed to connect to MongoDB",
        message: error.message,
      });
    }
  } else if (req.method === "POST") {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db("myrole"); // explicitly use the correct DB name
      const collection = db.collection("test_result"); // your collection is "user"
      //   const data = await collection.find({}).toArray();

      //   res.status(200).json(data);
      const test_result = {
        class: req.body.class,
        buleg: req.body.buleg,
        lastname: req.body.lastName,
        firstname: req.body.firstName,
        score: req.body.score,
        tuvshin: req.body.tuvshin,
        challenge: req.body.challenge,
        createdAt: new Date(),
      };

      const result = await db.collection("test_result").insertOne(test_result);
      res
        .status(201)
        .json({ message: "Post successfully added", data: result });
      await client.close();
    } catch (error) {
      console.error("MongoDB connection error:", error.message);
      res.status(500).json({
        error: "Failed to connect to MongoDB",
        message: error.message,
      });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
