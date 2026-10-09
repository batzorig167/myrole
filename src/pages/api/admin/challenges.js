import { getDb, sendError, toObjectId } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { validateChallenge } from "@/lib/validate";

// POST   /api/admin/challenges          — шинэ даалгавар (body.testId)
// PUT    /api/admin/challenges?id=...   — засах
// DELETE /api/admin/challenges?id=...   — устгах
export default async function handler(req, res) {
  try {
    if (!(await requireUser(req, res, ["admin"]))) return;
    const db = await getDb();
    const challenges = db.collection("challenges");

    if (req.method === "POST") {
      const testId = toObjectId(req.body?.testId);
      const test = testId && (await db.collection("tests").findOne({ _id: testId }));
      if (!test) return res.status(400).json({ message: "Тест олдсонгүй" });
      const { value, error } = validateChallenge(req.body);
      if (error) return res.status(400).json({ message: error });
      const { insertedId } = await challenges.insertOne({ ...value, testId });
      return res.status(201).json({ _id: String(insertedId) });
    }

    const _id = toObjectId(req.query.id);
    if (!_id) return res.status(404).json({ message: "Даалгавар олдсонгүй" });

    if (req.method === "PUT") {
      const { value, error } = validateChallenge(req.body);
      if (error) return res.status(400).json({ message: error });
      const { matchedCount } = await challenges.updateOne({ _id }, { $set: value });
      if (!matchedCount) return res.status(404).json({ message: "Даалгавар олдсонгүй" });
      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      await challenges.deleteOne({ _id });
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    sendError(res, error);
  }
}
