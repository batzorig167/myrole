import { getDb, sendError } from "@/lib/db";
import { loadContent } from "@/lib/content";

// Тест, даалгавар, сургуулийн жагсаалт — сурагчдад нээлттэй.
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const db = await getDb();
    res.status(200).json(await loadContent(db));
  } catch (error) {
    sendError(res, error);
  }
}
