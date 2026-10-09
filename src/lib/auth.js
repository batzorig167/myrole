import crypto from "crypto";
import { getDb, toObjectId } from "./db";

const COOKIE_NAME = "session";
const SESSION_DAYS = 7;

// ---- Нууц үг (scrypt) ----

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

// Хуучин хэрэглэгчдийн нууц үг энгийн текстээр хадгалагдсан байж болно.
export function verifyPassword(password, stored) {
  if (typeof stored !== "string" || typeof password !== "string") return false;
  if (!stored.startsWith("scrypt$")) {
    return safeEqual(password, stored);
  }
  const [, salt, hash] = stored.split("$");
  const candidate = crypto.scryptSync(password, salt, 64).toString("hex");
  return safeEqual(candidate, hash);
}

export function isLegacyPassword(stored) {
  return typeof stored === "string" && !stored.startsWith("scrypt$");
}

function safeEqual(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
}

// ---- Session cookie (HMAC гарын үсэгтэй) ----

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET орчны хувьсагч дор хаяж 32 тэмдэгттэй байх ёстой"
    );
  }
  return secret;
}

function sign(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function setSessionCookie(res, userId) {
  const payload = Buffer.from(
    JSON.stringify({
      id: String(userId),
      exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
    })
  ).toString("base64url");
  const token = `${payload}.${sign(payload)}`;
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
      SESSION_DAYS * 24 * 60 * 60
    }${secure}`
  );
}

export function clearSessionCookie(res) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
  );
}

function readSessionId(req) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(sign(payload), signature)) {
    return null;
  }
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return data.exp > Date.now() ? data.id : null;
  } catch {
    return null;
  }
}

// Хэрэглэгчийг хүсэлт бүрт DB-ээс уншина — admin эрхийг нь хассан
// эсвэл идэвхгүй болгосон бол тэр даруй хүчинтэй болно.
export async function getSessionUser(req) {
  const id = toObjectId(readSessionId(req));
  if (!id) return null;
  const db = await getDb();
  const user = await db.collection("users").findOne({ _id: id });
  if (!user || user.active === false) return null;
  return publicUser(user);
}

export async function requireUser(req, res, roles) {
  const user = await getSessionUser(req);
  if (!user) {
    res.status(401).json({ message: "Нэвтрэх шаардлагатай" });
    return null;
  }
  if (roles && !roles.includes(user.role)) {
    res.status(403).json({ message: "Танд энэ үйлдлийг хийх эрх байхгүй" });
    return null;
  }
  return user;
}

// Нууц үгийг хэзээ ч клиент рүү илгээхгүй.
export function publicUser(user) {
  return {
    _id: String(user._id),
    username: user.username,
    name: user.name || "",
    school: user.school || "",
    role: user.role || "psychologist",
    active: user.active !== false,
  };
}
