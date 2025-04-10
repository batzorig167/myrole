import { MongoClient } from "mongodb";
import moment from "moment-timezone";

const uri = process.env.DB_HOST;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db("myrole"); // explicitly use the correct DB name
      const collection = db.collection("test_result"); // your collection is "test_result"
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
      const collection = db.collection("test_result"); // your collection is "test_result"

      // Log the incoming body
      // console.log("Request body:", req.body);

      let newDate = moment().tz("Asia/Ulaanbaatar").format(); // Fix moment import

      const test_result = {
        class: req.body.class,
        school: req.body.school,
        buleg: req.body.buleg,
        lastname: req.body.lastName,
        firstname: req.body.firstName,
        score: req.body.score,
        tuvshin: req.body.tuvshin,
        challenge: req.body.challenge,
        category: req.body.category,
        createdAt: newDate, // Use formatted date
      };

      // Log the test result before saving
      // console.log("Test result data:", test_result);

      const result = await db.collection("test_result").insertOne(test_result);
      // console.log("Successfully inserted test result:", result);

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
