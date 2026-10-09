import { getDb, sendError, toObjectId } from "@/lib/db";
import { hashPassword, publicUser, requireUser } from "@/lib/auth";
import { validateUser } from "@/lib/validate";

// GET    /api/admin/users          — бүх хэрэглэгч (нууц үггүй)
// POST   /api/admin/users          — шинэ хэрэглэгч
// PUT    /api/admin/users?id=...   — нэвтрэх нэр, эрх, сургууль, идэвх, нууц үг өөрчлөх
// DELETE /api/admin/users?id=...   — устгах
export default async function handler(req, res) {
  try {
    const admin = await requireUser(req, res, ["admin"]);
    if (!admin) return;
    const db = await getDb();
    const users = db.collection("users");

    if (req.method === "GET") {
      const list = await users.find({}).sort({ username: 1 }).toArray();
      return res.status(200).json(list.map(publicUser));
    }

    if (req.method === "POST") {
      const { value, error } = validateUser(req.body, { isNew: true });
      if (error) return res.status(400).json({ message: error });
      if (await users.findOne({ username: value.username })) {
        return res.status(409).json({ message: "Ийм нэвтрэх нэр бүртгэлтэй байна" });
      }
      const { insertedId } = await users.insertOne({
        ...value,
        password: hashPassword(value.password),
        createdAt: new Date(),
      });
      return res.status(201).json({ _id: String(insertedId) });
    }

    const _id = toObjectId(req.query.id);
    const existing = _id && (await users.findOne({ _id }));
    if (!existing) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }
    const isSelf = String(_id) === admin._id;

    if (req.method === "PUT") {
      const { value, error } = validateUser(req.body, { isNew: false });
      if (error) return res.status(400).json({ message: error });
      // Admin өөрийгөө түгжихээс сэргийлнэ.
      if (isSelf && (value.role !== "admin" || !value.active)) {
        return res.status(400).json({
          message: "Өөрийн admin эрхийг хасах эсвэл идэвхгүй болгох боломжгүй",
        });
      }
      if (
        value.username &&
        value.username !== existing.username &&
        (await users.findOne({ username: value.username }))
      ) {
        return res.status(409).json({ message: "Ийм нэвтрэх нэр бүртгэлтэй байна" });
      }
      if (value.password) value.password = hashPassword(value.password);
      await users.updateOne({ _id }, { $set: value });
      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      if (isSelf) {
        return res.status(400).json({ message: "Өөрийгөө устгах боломжгүй" });
      }
      await users.deleteOne({ _id });
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    sendError(res, error);
  }
}
