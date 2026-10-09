import { MongoClient, ObjectId } from "mongodb";

// Нэг холболтыг бүх API хүсэлтэд дахин ашиглана (dev горимд hot-reload үед ч).
const globalForMongo = globalThis;

export async function getDb() {
  if (!process.env.DB_HOST) {
    throw new Error("DB_HOST орчны хувьсагч тохируулаагүй байна");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(
      process.env.DB_HOST
    ).connect();
  }
  const client = await globalForMongo._mongoClientPromise;
  return client.db("myrole");
}

export function toObjectId(id) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

export function sendError(res, error) {
  console.error(error);
  res.status(500).json({ message: "Серверийн алдаа гарлаа" });
}
