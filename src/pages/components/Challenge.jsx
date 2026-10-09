import { useState } from "react";
import { useScore } from "../Context/ScoreContext";
import { useRouter } from "next/router";
import { useUser } from "../Context/UserContext";
import { useCategory } from "../Context/CategoryContext";
import { useData } from "../Context/DataContext";
import { getTheme } from "@/lib/themes";
import { findLevel } from "@/lib/levels";

export default function Challenge({ props }) {
  const [selectItem, setSelectItem] = useState(null);
  const { catIndex } = useCategory();
  const { tuvshinRank } = useScore();
  const { test } = useData();
  const currentTest = test[catIndex];
  const { testUser, setTestUser } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state нэмсэн

  function handleBtn(item) {
    setSelectItem(item);
  }

  function closeHandle() {
    setSelectItem(null);
  }

  function goToHomepage() {
    router.push("/homepage");
  }
  async function handleSubmit() {
    if (loading) return; // Ачаалал явж байвал дахин хүсэлт илгээхгүй

    setLoading(true); // Ачаалал эхэлсэн гэдгийг заах

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

    // console.log("Илгээж буй дата:", postData);

    try {
      const response = await fetch("/api/test-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        goToHomepage();
      } else {
        alert("Алдаа гарлаа: " + data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false); // Ачаалал дууссан гэдгийг заах
    }

    setSelectItem(null);
  }

  function chooseHandle() {
    setTestUser({ ...testUser, tuvshin: tuvshinRank, challenge: selectItem });
    handleSubmit();
  }

  if (!props || !Array.isArray(props) || !currentTest || !testUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-cream">
        <div className="animate-pulse text-xl text-muted">Ачааллаж байна...</div>
      </div>
    );
  }

  const level = findLevel(currentTest.levels, testUser.score);
  const tone = getTheme(level?.tone);
  const urgent = Boolean(level?.urgent);

  return (
    <div className="min-h-screen bg-cream px-4 py-10 text-ink">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold text-muted">{currentTest.testName} · Үр дүн</p>
        <div className={`mt-3 rounded-[2rem] ${tone.soft} p-7 md:p-9`}>
          <p className="text-sm text-muted">Таны сэтгэл зүйн түвшин</p>
          <h1
            className={`mt-1 font-serif text-3xl font-semibold md:text-4xl ${tone.text}`}
          >
            {tuvshinRank}
          </h1>
          <p className="mt-3 leading-relaxed text-ink/80">{level?.note}</p>
          {urgent && (
            <p className="mt-4 rounded-2xl bg-white/70 px-4 py-3 text-sm">
              Хүүхдийн тусламжийн утас{" "}
              <span className="font-semibold">108</span> — 24 цаг, үнэ төлбөргүй.
            </p>
          )}
        </div>

        <h2 className="mt-10 font-serif text-2xl font-semibold">
          Танд санал болгох даалгаврууд
        </h2>
        <p className="mt-1 text-sm text-muted">
          Нэгийг нь сонгоод өдөр бүр хэрэгжүүлж үзээрэй.
        </p>

        <div className="mt-5 flex flex-col gap-3">
          {props.length === 0 && (
            <p className="rounded-2xl bg-white px-5 py-4 text-muted ring-1 ring-line">
              Энэ түвшинд одоогоор даалгавар нэмэгдээгүй байна.
            </p>
          )}
          {props.map((data, index) => (
            <button
              key={index}
              className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-left text-lg shadow-sm ring-1 ring-line transition hover:-translate-y-0.5 hover:ring-sage"
              onClick={() => handleBtn(data)}
            >
              {data.name}
              <span className="text-muted">→</span>
            </button>
          ))}
        </div>
      </div>

      {selectItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl space-y-6 rounded-[2rem] bg-white p-7 shadow-xl md:p-8">
            <button
              onClick={closeHandle}
              aria-label="Хаах"
              className="absolute right-5 top-5 text-muted transition hover:text-ink"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="pr-8 font-serif text-2xl font-semibold">
              {selectItem.name}
            </h2>

            <div className="space-y-4 leading-relaxed">
              <div>
                <p className="text-sm font-semibold text-sage">Даалгавар</p>
                <p>{selectItem.daalgavar}</p>
              </div>

              {selectItem.example.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-sage">Жишээ</p>
                  <ul className="list-inside list-disc text-sm text-ink/80">
                    {selectItem.example.map((ex, idx) => (
                      <li key={idx}>{ex}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-sage">Зорилго</p>
                <p>{selectItem.zorilgo}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-line pt-5">
              <button
                onClick={closeHandle}
                className="rounded-full px-5 py-2.5 font-semibold text-muted transition hover:bg-sand"
              >
                Хаах
              </button>
              <button
                onClick={chooseHandle}
                className="rounded-full bg-sage px-6 py-2.5 font-semibold text-white transition hover:bg-sage-dark disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Хадгалж байна..." : "Сонгох"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
