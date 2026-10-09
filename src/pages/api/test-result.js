import moment from "moment-timezone";
import { getDb, sendError, toObjectId } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { findLevel } from "@/lib/levels";

const text = (value, max = 100) => String(value ?? "").trim().slice(0, max);

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const collection = db.collection("test_result");

    // Үр дүнг зөвхөн нэвтэрсэн хүн харна. Сэтгэл зүйч зөвхөн өөрийн сургуулийг.
    if (req.method === "GET") {
      const user = await requireUser(req, res);
      if (!user) return;
      const filter =
        user.role === "admin"
          ? req.query.school
            ? { school: String(req.query.school) }
            : {}
          : { school: user.school };
      const data = await collection.find(filter).sort({ createdAt: -1 }).toArray();
      return res.status(200).json(data);
    }

    // Сурагч тест бөглөөд илгээнэ — нэвтрэх шаардлагагүй.
    if (req.method === "POST") {
      const body = req.body || {};
      const test = await db
        .collection("tests")
        .findOne({ _id: toObjectId(body.testId) });
      if (!test) {
        return res.status(400).json({ message: "Тест олдсонгүй" });
      }
      const score = Number(body.score);
      if (!Number.isFinite(score)) {
        return res.status(400).json({ message: "Оноо буруу байна" });
      }
      const challenge = await db
        .collection("challenges")
        .findOne({ _id: toObjectId(body.challengeId), testId: test._id });

      const testResult = {
        class: text(body.class, 10),
        school: text(body.school, 50),
        buleg: text(body.buleg, 10),
        lastname: text(body.lastName),
        firstname: text(body.firstName),
        score,
        tuvshin: findLevel(test.levels, score)?.name || "",
        challenge: challenge
          ? {
              name: challenge.name,
              rank: challenge.rank,
              daalgavar: challenge.daalgavar,
              example: challenge.example,
              zorilgo: challenge.zorilgo,
            }
          : null,
        category: test.testName,
        createdAt: moment().tz("Asia/Ulaanbaatar").format(),
      };

      const result = await collection.insertOne(testResult);
      return res
        .status(201)
        .json({ message: "Post successfully added", data: result });
    }

    res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    sendError(res, error);
  }
}
