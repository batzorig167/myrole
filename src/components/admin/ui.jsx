// Admin самбарын хуваалцах жижиг хэсгүүд.

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
  "w-full rounded-xl border-2 border-line bg-cream px-3 py-2 font-semibold text-ink focus:border-sage focus:outline-none";

export function Field({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-black">{label}</span>
      {children}
    </label>
  );
}

export function Button({ variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "pop bg-sage text-white [--edge:#12704f]",
    ghost: "text-muted hover:bg-cream hover:text-ink",
    outline: "pop bg-white ring-2 ring-line hover:ring-sage",
    danger: "text-rose hover:bg-rose-soft",
  };
  return (
    <button
      type="button"
      className={`rounded-xl px-4 py-2 text-sm font-black transition disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-[1.75rem] bg-white p-5 ring-2 ring-line ${className}`}>
      {children}
    </div>
  );
}

export function Notice({ error, success }) {
  if (error) {
    return <p className="rounded-2xl bg-rose-soft px-4 py-3 text-sm font-bold text-rose">{error}</p>;
  }
  if (success) {
    return (
      <p className="rounded-2xl bg-sage-soft px-4 py-3 text-sm font-bold text-sage-dark">✓ {success}</p>
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
          <span className="w-6 pt-2 text-right text-sm text-muted">{index + 1}.</span>
          <div className="min-w-0 flex-1">{renderItem(item, (v) => update(index, v))}</div>
          <div className="flex shrink-0 pt-1">
            <button type="button" title="Дээш" onClick={() => move(index, -1)} className="px-1.5 text-muted hover:text-ink">↑</button>
            <button type="button" title="Доош" onClick={() => move(index, 1)} className="px-1.5 text-muted hover:text-ink">↓</button>
            <button type="button" title="Устгах" onClick={() => remove(index)} className="px-1.5 text-rose">✕</button>
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={() => onChange([...items, newItem()])}>
        + {addLabel}
      </Button>
    </div>
  );
}
