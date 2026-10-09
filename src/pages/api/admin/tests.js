import { getDb, sendError, toObjectId } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { validateTest } from "@/lib/validate";

// POST   /api/admin/tests          — шинэ тест
// PUT    /api/admin/tests?id=...   — засах
// DELETE /api/admin/tests?id=...   — устгах (даалгавруудтай нь)
export default async function handler(req, res) {
  try {
    if (!(await requireUser(req, res, ["admin"]))) return;
    const db = await getDb();
    const tests = db.collection("tests");

    if (req.method === "POST" || req.method === "PUT") {
      const { value, error } = validateTest(req.body);
      if (error) return res.status(400).json({ message: error });

      const duplicate = await tests.findOne({ testName: value.testName });
      if (req.method === "POST") {
        if (duplicate) {
          return res.status(409).json({ message: "Ийм нэртэй тест бий" });
        }
        const { insertedId } = await tests.insertOne(value);
        return res.status(201).json({ _id: String(insertedId) });
      }

      const _id = toObjectId(req.query.id);
      const existing = _id && (await tests.findOne({ _id }));
      if (!existing) return res.status(404).json({ message: "Тест олдсонгүй" });
      if (duplicate && String(duplicate._id) !== String(_id)) {
        return res.status(409).json({ message: "Ийм нэртэй тест бий" });
      }
      await tests.updateOne({ _id }, { $set: value });
      // Нэр өөрчлөгдвөл хуучин үр дүнгүүдийг шинэ нэртэй холбоно.
      if (existing.testName !== value.testName) {
        await db
          .collection("test_result")
          .updateMany(
            { category: existing.testName },
            { $set: { category: value.testName } }
          );
      }
      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      const _id = toObjectId(req.query.id);
      if (!_id) return res.status(404).json({ message: "Тест олдсонгүй" });
      await tests.deleteOne({ _id });
      await db.collection("challenges").deleteMany({ testId: _id });
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    sendError(res, error);
  }
}
