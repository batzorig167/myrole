import { useState } from "react";
import { useScore } from "../Context/ScoreContext";
import { useRouter } from "next/router";
import { useUser } from "../Context/UserContext";
import { useCategory } from "../Context/CategoryContext";
import { useData } from "../Context/DataContext";
import { getTheme } from "@/lib/themes";
import { findLevel } from "@/lib/levels";
import { Mascot } from "@/components/Mascot";

export default function Challenge({ props }) {
  const [selectItem, setSelectItem] = useState(null);
  const { catIndex } = useCategory();
  const { tuvshinRank } = useScore();
  const { test } = useData();
  const currentTest = test[catIndex];
  const { testUser, setTestUser } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleBtn(item) {
    setSelectItem(item);
  }

  function closeHandle() {
    setSelectItem(null);
  }

  const [done, setDone] = useState(null); // илгээсэн даалгавар
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (loading) return;
    setLoading(true);
    setError("");

    // Түвшинг сервер оноогоор дахин тооцно
    const postData = {
      school: testUser.school,
      class: testUser.class,
      buleg: testUser.buleg,
      lastName: testUser.lastName,
      firstName: testUser.firstName,
      score: testUser.score,
      testId: currentTest._id,
      challengeId: selectItem._id,
    };

    try {
      const response = await fetch("/api/test-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      if (response.ok) {
        setDone(selectItem);
        setSelectItem(null);
      } else {
        setError(data.message || "Алдаа гарлаа");
      }
    } catch (err) {
      setError("Интернэт холболтоо шалгаад дахин оролдоорой");
    } finally {
      setLoading(false);
    }
  }

  function chooseHandle() {
    setTestUser({ ...testUser, tuvshin: tuvshinRank, challenge: selectItem });
    handleSubmit();
  }

  if (!props || !Array.isArray(props) || !currentTest || !testUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-cream">
        <div className="animate-pulse text-xl font-bold text-muted">Ачааллаж байна...</div>
      </div>
    );
  }

  const level = findLevel(currentTest.levels, testUser.score);
  const tone = getTheme(level?.tone);
  const urgent = Boolean(level?.urgent);

  // Даалгавар сонгож дууссан дэлгэц
  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-10 text-ink">
        <div className="w-full max-w-lg text-center">
          <div className="animate-float mx-auto h-48 w-48">
            <Mascot />
          </div>
          <h1 className="mt-4 text-4xl font-black">Баяр хүргэе! 🎉</h1>
          <p className="mt-2 text-lg font-medium text-muted">
            Чи өөртөө анхаарал тавих том алхам хийлээ.
          </p>
          <div className="mt-6 rounded-[2rem] bg-white p-6 text-left ring-2 ring-line">
            <p className="text-sm font-black uppercase tracking-wide text-coral">
              Таны даалгавар
            </p>
            <p className="mt-1 text-xl font-black">{done.name}</p>
            <p className="mt-2 font-medium text-ink/80">{done.daalgavar}</p>
          </div>
          <button
            onClick={() => router.push("/homepage")}
            className="pop mt-8 rounded-2xl bg-coral px-8 py-4 text-lg font-black text-white [--edge:#e05a38]"
          >
            Нүүр хуудас руу 🏠
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-8 text-ink md:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Үр дүн */}
        <div
          className={`pop relative overflow-hidden rounded-[2.5rem] ${tone.card} p-7 text-white md:p-10`}
          style={{ "--edge": tone.edge }}
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/15" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-white/80">
                {currentTest.testName} · Үр дүн
              </p>
              <h1 className="mt-2 text-3xl font-black leading-tight md:text-4xl">
                {tuvshinRank}
              </h1>
              <p className="mt-3 text-lg font-semibold leading-relaxed text-white/90">
                {level?.note}
              </p>
            </div>
            <div className="mx-auto h-32 w-32 md:h-40 md:w-40">
              <Mascot mood="calm" />
            </div>
          </div>
          {urgent && (
            <p className="relative mt-5 rounded-2xl bg-white px-5 py-4 font-bold text-ink">
              📞 Хүүхдийн тусламжийн утас{" "}
              <span className="text-xl font-black text-coral">108</span> — 24 цаг,
              үнэ төлбөргүй. Та ганцаараа биш.
            </p>
          )}
        </div>

        {/* Даалгаврууд */}
        <h2 className="mt-12 text-2xl font-black md:text-3xl">Даалгавраа сонго 🎯</h2>
        <p className="mt-1 font-medium text-muted">
          Нэгийг нь сонгоод өдөр бүр хэрэгжүүлж үзээрэй.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {props.length === 0 && (
            <p className="rounded-2xl bg-white px-5 py-4 font-semibold text-muted ring-2 ring-line">
              Энэ түвшинд одоогоор даалгавар нэмэгдээгүй байна.
            </p>
          )}
          {props.map((data, index) => (
            <button
              key={index}
              className="pop group flex flex-col rounded-[1.75rem] bg-white p-5 text-left ring-2 ring-line transition hover:-translate-y-0.5 hover:ring-coral"
              onClick={() => handleBtn(data)}
            >
              <span className="text-lg font-black leading-snug">{data.name}</span>
              <span className="mt-2 line-clamp-2 flex-1 text-sm font-medium text-muted">
                {data.daalgavar}
              </span>
              <span className="mt-4 text-sm font-black text-coral group-hover:underline">
                Дэлгэрэнгүй →
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="relative max-h-[90vh] w-full max-w-xl space-y-5 overflow-y-auto rounded-t-[2rem] bg-white p-7 sm:rounded-[2rem] md:p-8">
            <button
              onClick={closeHandle}
              aria-label="Хаах"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-cream text-lg font-black text-muted transition hover:text-ink"
            >
              ✕
            </button>

            <h2 className="pr-12 text-2xl font-black">{selectItem.name}</h2>

            <div className="space-y-4 leading-relaxed">
              <div className="rounded-2xl bg-bubble-soft p-4">
                <p className="text-sm font-black text-sky">📝 Даалгавар</p>
                <p className="mt-1 font-semibold">{selectItem.daalgavar}</p>
              </div>
              {selectItem.example.length > 0 && (
                <div className="rounded-2xl bg-sun-soft p-4">
                  <p className="text-sm font-black text-[#b07d00]">💡 Жишээ</p>
                  <ul className="mt-1 list-inside list-disc text-sm font-semibold text-ink/80">
                    {selectItem.example.map((ex, idx) => (
                      <li key={idx}>{ex}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="rounded-2xl bg-mint-soft p-4">
                <p className="text-sm font-black text-sage">🎯 Зорилго</p>
                <p className="mt-1 font-semibold">{selectItem.zorilgo}</p>
              </div>
            </div>

            {error && (
              <p className="rounded-2xl bg-rose-soft px-4 py-3 font-bold text-rose">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={closeHandle}
                className="flex-1 rounded-2xl bg-cream py-3.5 font-black text-muted ring-2 ring-line"
              >
                Буцах
              </button>
              <button
                onClick={chooseHandle}
                disabled={loading}
                className="pop flex-[2] rounded-2xl bg-coral py-3.5 font-black text-white [--edge:#e05a38] disabled:opacity-60"
              >
                {loading ? "Хадгалж байна..." : "Энийг сонгоё! ✨"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
