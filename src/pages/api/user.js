import { MongoClient } from "mongodb";

const uri = process.env.DB_HOST;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db("myrole"); // explicitly use the correct DB name
      const collection = db.collection("users"); // your collection is "user"
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
  } else  if (req.method === "POST") {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db("myrole"); // explicitly use the correct DB name
      const collection = db.collection("users"); // your collection is "user"
    //   const data = await collection.find({}).toArray();

    //   res.status(200).json(data);
        const newPost = {
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date(),
        };

        const result = await db.collection('users').insertOne(newPost);
        res.status(201).json({ message: 'Post successfully added', data: result });
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

