import { getDb, sendError } from "@/lib/db";
import {
  hashPassword,
  isLegacyPassword,
  publicUser,
  setSessionCookie,
  verifyPassword,
} from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const { username, password } = req.body || {};
    const db = await getDb();
    const users = db.collection("users");
    const user = await users.findOne({ username: String(username || "") });

    if (!user || !verifyPassword(String(password || ""), user.password)) {
      return res
        .status(401)
        .json({ message: "Нэвтрэх нэр эсвэл нууц үг буруу байна" });
    }
    if (user.active === false) {
      return res
        .status(403)
        .json({ message: "Таны эрхийг идэвхгүй болгосон байна. Админд хандана уу." });
    }
    // Хуучин энгийн текст нууц үгийг анх нэвтрэх үед hash болгоно.
    if (isLegacyPassword(user.password)) {
      await users.updateOne(
        { _id: user._id },
        { $set: { password: hashPassword(password) } }
      );
    }
    setSessionCookie(res, user._id);
    res.status(200).json({ user: publicUser(user) });
  } catch (error) {
    sendError(res, error);
  }
}
