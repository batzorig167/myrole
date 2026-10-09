// Эхний admin хэрэглэгчийг үүсгэх, эсвэл байгаа хэрэглэгчийг admin болгох.
//
//   node scripts/create-admin.mjs <нэвтрэх-нэр> <нууц-үг> ["Нэр"]
//
// DB_HOST-ийг .env.local файлаас эсвэл орчны хувьсагчаас уншина.
import crypto from "crypto";
import fs from "fs";
import { MongoClient } from "mongodb";

if (!process.env.DB_HOST && fs.existsSync(".env.local")) {
  for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (match) process.env[match[1]] ??= match[2].replace(/^["']|["']$/g, "");
  }
}

const [username, password, name = "Админ"] = process.argv.slice(2);
if (!username || !password || password.length < 8) {
  console.error(
    'Хэрэглээ: node scripts/create-admin.mjs <нэвтрэх-нэр> <нууц-үг (8+ тэмдэгт)> ["Нэр"]'
  );
  process.exit(1);
}
if (!process.env.DB_HOST) {
  console.error("DB_HOST олдсонгүй. .env.local файлд DB_HOST=... гэж нэмнэ үү.");
  process.exit(1);
}

// src/lib/auth.js доторх hashPassword-тэй ижил формат
const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto.scryptSync(password, salt, 64).toString("hex");

const client = await new MongoClient(process.env.DB_HOST).connect();
try {
  const users = client.db("myrole").collection("users");
  const result = await users.updateOne(
    { username },
    {
      $set: { password: `scrypt$${salt}$${hash}`, role: "admin", active: true },
      $setOnInsert: { name, school: "", createdAt: new Date() },
    },
    { upsert: true }
  );
  console.log(
    result.upsertedCount
      ? `✓ Шинэ admin "${username}" үүслээ.`
      : `✓ "${username}" хэрэглэгчийг admin болгож, нууц үгийг шинэчиллээ.`
  );
} finally {
  await client.close();
}
