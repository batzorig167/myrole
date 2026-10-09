import { getSessionUser } from "@/lib/auth";
import { sendError } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const user = await getSessionUser(req);
    if (!user) return res.status(401).json({ user: null });
    res.status(200).json({ user });
  } catch (error) {
    sendError(res, error);
  }
}
