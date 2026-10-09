// Admin самбарын хуваалцах жижиг хэсгүүд — энгийн, ажлын хэрэгслийн загвар.

export async function api(method, url, body) {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Алдаа гарлаа");
  return data;
}

export const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200";

export function Field({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

export function Button({ variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-slate-900 text-white shadow-sm hover:bg-slate-700",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    outline: "border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50",
    danger: "text-red-600 hover:bg-red-50",
  };
  return (
    <button
      type="button"
      className={`rounded-md px-3 py-2 text-sm font-medium transition disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-white p-5 ${className}`}>
      {children}
    </div>
  );
}

export function Notice({ error, success }) {
  if (error) {
    return (
      <p className="rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
        {error}
      </p>
    );
  }
  if (success) {
    return (
      <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">
        {success}
      </p>
    );
  }
  return null;
}

// Мөр нэмэх/хасах боломжтой жагсаалт (асуулт, жишээ г.м.)
export function ListEditor({ items, onChange, renderItem, newItem, addLabel }) {
  const update = (index, value) =>
    onChange(items.map((item, i) => (i === index ? value : item)));
  const remove = (index) => onChange(items.filter((_, i) => i !== index));
  const move = (index, delta) => {
    const next = [...items];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <span className="w-6 pt-2 text-right text-sm text-slate-400">{index + 1}.</span>
          <div className="min-w-0 flex-1">{renderItem(item, (v) => update(index, v))}</div>
          <div className="flex shrink-0 pt-1">
            <button type="button" title="Дээш" onClick={() => move(index, -1)} className="px-1.5 text-slate-400 hover:text-slate-900">↑</button>
            <button type="button" title="Доош" onClick={() => move(index, 1)} className="px-1.5 text-slate-400 hover:text-slate-900">↓</button>
            <button type="button" title="Устгах" onClick={() => remove(index)} className="px-1.5 text-red-500 hover:text-red-700">✕</button>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={() => onChange([...items, newItem()])}>
        + {addLabel}
      </Button>
    </div>
  );
}
