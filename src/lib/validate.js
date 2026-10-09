// Admin-аас ирсэн өгөгдлийг шалгаж цэвэрлэнэ. Алдаа бол { error }, зөв бол { value }.

export const THEMES = ["sky", "lavender", "peach", "sage", "rose"];

const str = (value, max = 500) => String(value ?? "").trim().slice(0, max);
const num = (value) => (value === "" || value === null ? NaN : Number(value));

export function validateTest(body = {}) {
  const testName = str(body.testName, 100);
  if (!testName) return { error: "Тестийн нэр оруулна уу" };

  const question = (body.question || []).map((q) => str(q, 1000)).filter(Boolean);
  if (question.length === 0) return { error: "Дор хаяж нэг асуулт нэмнэ үү" };

  const result = (body.result || []).map((r) => ({
    result: str(r.result, 200),
    score: num(r.score),
  }));
  if (result.length < 2) return { error: "Дор хаяж хоёр хариултын сонголт нэмнэ үү" };
  if (result.some((r) => !r.result || !Number.isFinite(r.score))) {
    return { error: "Хариулт бүр текст болон тоон оноотой байх ёстой" };
  }

  const levels = (body.levels || []).map((l) => ({
    name: str(l.name, 100),
    min: num(l.min),
    rank: num(l.rank),
    tone: THEMES.includes(l.tone) ? l.tone : "sage",
    urgent: Boolean(l.urgent),
    note: str(l.note, 500),
  }));
  if (levels.length === 0) return { error: "Дор хаяж нэг түвшин нэмнэ үү" };
  if (levels.some((l) => !l.name || !Number.isFinite(l.min) || !Number.isInteger(l.rank))) {
    return { error: "Түвшин бүр нэр, доод оноо, даалгаврын зэрэгтэй байх ёстой" };
  }
  if (new Set(levels.map((l) => l.min)).size !== levels.length) {
    return { error: "Түвшний доод оноо давхцахгүй байх ёстой" };
  }
  levels.sort((a, b) => a.min - b.min);

  return {
    value: {
      testName,
      description: str(body.description, 300),
      theme: THEMES.includes(body.theme) ? body.theme : "sage",
      order: Number.isFinite(num(body.order)) ? num(body.order) : 0,
      question,
      result,
      levels,
    },
  };
}

export function validateChallenge(body = {}) {
  const name = str(body.name, 200);
  const rank = num(body.rank);
  const daalgavar = str(body.daalgavar, 2000);
  if (!name) return { error: "Даалгаврын нэр оруулна уу" };
  if (!Number.isInteger(rank) || rank < 1) {
    return { error: "Зэрэг нь 1-ээс их бүхэл тоо байх ёстой" };
  }
  if (!daalgavar) return { error: "Даалгаврын тайлбар оруулна уу" };
  return {
    value: {
      name,
      rank,
      daalgavar,
      example: (body.example || []).map((e) => str(e, 500)).filter(Boolean),
      zorilgo: str(body.zorilgo, 1000),
    },
  };
}

export function validateSchool(body = {}, { requireCode = true } = {}) {
  const name = str(body.name, 100);
  if (!name) return { error: "Сургуулийн нэр оруулна уу" };
  if (!requireCode) return { value: { name } };
  const code = str(body.code, 50).toLowerCase();
  if (!/^[a-z0-9_-]+$/.test(code)) {
    return { error: "Код нь зөвхөн латин жижиг үсэг, тоо, - _ агуулна" };
  }
  return { value: { code, name } };
}

export function validateUser(body = {}, { isNew }) {
  const value = {
    name: str(body.name, 100),
    school: str(body.school, 50),
    role: body.role === "admin" ? "admin" : "psychologist",
    active: body.active !== false,
  };
  // Шинэ хэрэглэгчид заавал, засахад ирсэн бол нэвтрэх нэрийг шалгана
  if (isNew || body.username !== undefined) {
    value.username = str(body.username, 50);
    if (!/^[A-Za-z0-9_.-]{3,}$/.test(value.username)) {
      return {
        error: "Нэвтрэх нэр 3-аас дээш латин үсэг, тоо, . _ - агуулна",
      };
    }
  }
  const password = String(body.password ?? "");
  if (isNew || password) {
    if (password.length < 8) {
      return { error: "Нууц үг дор хаяж 8 тэмдэгт байна" };
    }
    value.password = password;
  }
  if (value.role === "psychologist" && !value.school) {
    return { error: "Сэтгэл зүйчид сургууль сонгоно уу" };
  }
  return { value };
}
