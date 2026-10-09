import { getDb, sendError, toObjectId } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { validateSchool } from "@/lib/validate";

// POST   /api/admin/schools          — шинэ сургууль
// PUT    /api/admin/schools?id=...   — нэр засах (код өөрчлөгдөхгүй, үр дүнтэй холбоотой тул)
// DELETE /api/admin/schools?id=...   — устгах (хэрэглэгч холбоотой бол болохгүй)
export default async function handler(req, res) {
  try {
    if (!(await requireUser(req, res, ["admin"]))) return;
    const db = await getDb();
    const schools = db.collection("schools");

    if (req.method === "POST") {
      const { value, error } = validateSchool(req.body);
      if (error) return res.status(400).json({ message: error });
      if (await schools.findOne({ code: value.code })) {
        return res.status(409).json({ message: "Ийм кодтой сургууль бий" });
      }
      const { insertedId } = await schools.insertOne(value);
      return res.status(201).json({ _id: String(insertedId) });
    }

    const _id = toObjectId(req.query.id);
    const school = _id && (await schools.findOne({ _id }));
    if (!school) return res.status(404).json({ message: "Сургууль олдсонгүй" });

    if (req.method === "PUT") {
      const { value, error } = validateSchool(req.body, { requireCode: false });
      if (error) return res.status(400).json({ message: error });
      await schools.updateOne({ _id }, { $set: value });
      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      const users = await db.collection("users").countDocuments({ school: school.code });
      if (users > 0) {
        return res.status(409).json({
          message: `Энэ сургуульд ${users} хэрэглэгч бүртгэлтэй тул устгах боломжгүй`,
        });
      }
      await schools.deleteOne({ _id });
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    sendError(res, error);
  }
}
