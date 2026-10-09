import { getDb, sendError, toObjectId } from "@/lib/db";
import { hashPassword, publicUser, requireUser, verifyPassword } from "@/lib/auth";

// PUT /api/auth/profile — нэвтэрсэн хэрэглэгч өөрийн нэр, нууц үгээ солино.
// Нууц үг солихдоо одоогийн нууц үгээ заавал оруулна.
export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const me = await requireUser(req, res);
    if (!me) return;
    const db = await getDb();
    const users = db.collection("users");
    const user = await users.findOne({ _id: toObjectId(me._id) });

    const { name, currentPassword, newPassword } = req.body || {};
    const update = {};

    if (name !== undefined) {
      update.name = String(name).trim().slice(0, 100);
    }
    if (newPassword) {
      if (!verifyPassword(String(currentPassword || ""), user.password)) {
        return res.status(400).json({ message: "Одоогийн нууц үг буруу байна" });
      }
      if (String(newPassword).length < 8) {
        return res.status(400).json({ message: "Шинэ нууц үг дор хаяж 8 тэмдэгт байна" });
      }
      if (String(newPassword) === String(currentPassword)) {
        return res
          .status(400)
          .json({ message: "Шинэ нууц үг хуучнаасаа өөр байх ёстой" });
      }
      update.password = hashPassword(String(newPassword));
    }

    await users.updateOne({ _id: user._id }, { $set: update });
    res.status(200).json({ user: publicUser({ ...user, ...update }) });
  } catch (error) {
    sendError(res, error);
  }
}
