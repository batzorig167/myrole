// Үр дүнг огноогоор шүүх туслах функцууд. Огноо нь "YYYY-MM-DD" (хэрэглэгчийн орон нутгийн цаг).

const pad = (n) => String(n).padStart(2, "0");

export function toInput(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

const startOf = (day) => new Date(`${day}T00:00:00`);
const endOf = (day) => new Date(`${day}T23:59:59.999`);

export function presetRange(key, now = new Date()) {
  const today = toInput(now);
  if (key === "today") return { from: today, to: today };
  if (key === "week") {
    const from = new Date(now);
    from.setDate(from.getDate() - 6);
    return { from: toInput(from), to: today };
  }
  if (key === "month") {
    return { from: toInput(new Date(now.getFullYear(), now.getMonth(), 1)), to: today };
  }
  return { from: "", to: "" };
}

export function inRange(value, { from, to }) {
  const time = new Date(value);
  if (from && time < startOf(from)) return false;
  if (to && time > endOf(to)) return false;
  return true;
}

// Хугацааны хэдэн өдөр — "Бүгд" үед хамгийн эхний үр дүнгээс өнөөдөр хүртэл
export function dayCount({ from, to }, values, now = new Date()) {
  const start = from
    ? startOf(from)
    : values.length
    ? new Date(Math.min(...values.map((v) => new Date(v).getTime())))
    : now;
  const end = to ? endOf(to) : now;
  const days = Math.floor((startOf(toInput(end)) - startOf(toInput(start))) / 86400000) + 1;
  return Math.max(1, days);
}
