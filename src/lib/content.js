import { seedChallenges, seedSchools, seedTests } from "./seedData";

// DB хоосон бол анхны өгөгдлийг нэг удаа оруулна.
// `meta` дахь "seed" баримт нь давхар оруулахаас сэргийлнэ.
export async function ensureSeeded(db) {
  const done = await db.collection("meta").findOne({ _id: "seed" });
  if (done) return;
  try {
    await db.collection("meta").insertOne({ _id: "seed", at: new Date() });
  } catch (error) {
    if (error.code === 11000) return; // өөр хүсэлт аль хэдийн seed хийж байна
    throw error;
  }

  const { insertedIds } = await db
    .collection("tests")
    .insertMany(seedTests.map(({ ...test }) => test));
  const idByName = {};
  seedTests.forEach((test, i) => {
    idByName[test.testName] = insertedIds[i];
  });
  await db.collection("challenges").insertMany(
    seedChallenges.map(({ category, ...item }) => ({
      ...item,
      testId: idByName[category],
    }))
  );
  await db.collection("schools").insertMany(seedSchools.map((s) => ({ ...s })));
}

export async function loadContent(db) {
  await ensureSeeded(db);
  const [tests, challenges, schools] = await Promise.all([
    db.collection("tests").find({}).sort({ order: 1, _id: 1 }).toArray(),
    db.collection("challenges").find({}).sort({ rank: 1, _id: 1 }).toArray(),
    db.collection("schools").find({}).sort({ name: 1 }).toArray(),
  ]);
  return {
    tests: tests.map((test) => ({
      ...test,
      _id: String(test._id),
      challenges: challenges
        .filter((c) => String(c.testId) === String(test._id))
        .map((c) => ({ ...c, _id: String(c._id), testId: String(c.testId) })),
    })),
    schools: schools.map((s) => ({ ...s, _id: String(s._id) })),
  };
}
