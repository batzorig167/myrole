"use client";
import { useEffect, useState } from "react";
import { useUser } from "./Context/UserContext";
import { useRouter } from "next/router";
import { useScore } from "./Context/ScoreContext";
import { useCategory } from "./Context/CategoryContext";
import { useData } from "./Context/DataContext";
import { getTheme } from "@/lib/themes";
import { findLevel } from "@/lib/levels";
import { Mascot } from "@/components/Mascot";
import Link from "next/link";

export default function Home() {
  const { challenge, test, loading } = useData();
  const { testUser, setTestUser } = useUser();
  const { score, setScore, setTuvshin, setTuvshinRank } = useScore();
  const { catIndex } = useCategory();
  // ene ni asuultin index
  const [qIndex, setQindex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (testUser == null) {
      router.push("/SignUp");
    }
  }, [testUser, router]);

  // Тест бүр 0 онооноос эхэлнэ
  useEffect(() => {
    setScore(0);
  }, [catIndex, setScore]);

  if (loading || !test[catIndex]) {
    return (
      <div className="flex h-screen items-center justify-center bg-cream font-bold text-muted">
        Ачааллаж байна...
      </div>
    );
  }

  const current = test[catIndex];
  const total = current.question.length;

  function handleSubmit(answer) {
    const newScore = score + answer.score;
    setScore(newScore);
    if (qIndex < total - 1) {
      setQindex(qIndex + 1);
      return;
    }
    const level = findLevel(current.levels, newScore);
    setTuvshinRank(level?.name);
    setTuvshin(
      challenge[catIndex].challenge.filter((data) => data.rank == level?.rank)
    );
    setTestUser({ ...testUser, score: newScore });
    router.push("/challenge");
  }

  const meta = getTheme(current.theme);
  const progress = Math.round((qIndex / total) * 100);
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="mx-auto max-w-3xl px-4 py-6 md:py-10">
        {/* Дээд мөр: гарах, сэдэв, ахиц */}
        <div className="flex items-center gap-3">
          <Link
            href="/homepage"
            aria-label="Гарах"
            className="pop flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl font-black ring-2 ring-line"
          >
            ✕
          </Link>
          <div className="relative h-5 flex-1 rounded-full bg-sand">
            <div
              className={`h-full rounded-full ${meta.card} transition-all duration-500`}
              style={{ width: `${Math.max(progress, 4)}%` }}
            />
            <div
              className="absolute -top-4 h-12 w-12 -translate-x-1/2 transition-all duration-500"
              style={{ left: `${Math.max(progress, 4)}%` }}
            >
              <Mascot />
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-sm font-black ring-2 ring-line">
            {qIndex + 1}/{total}
          </span>
        </div>

        {/* Асуулт */}
        <div
          className={`pop mt-10 rounded-[2.5rem] ${meta.card} p-7 text-white md:p-10`}
          style={{ "--edge": meta.edge }}
        >
          <div className="flex items-center gap-2 text-sm font-black text-white/85">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/25">
              <meta.Icon className="h-5 w-5" />
            </span>
            {current.testName}
          </div>
          <h1 className="mt-4 text-2xl font-black leading-snug md:text-3xl">
            {current.question[qIndex].replace(/^\d+\.\s*/, "")}
          </h1>
        </div>

        {/* Хариултууд */}
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {current.result.map((data, index) => (
            <button
              key={`${qIndex}-${index}`}
              onClick={() => handleSubmit(data)}
              className="pop group flex items-center gap-4 rounded-2xl bg-white px-4 py-4 text-left text-base font-bold ring-2 ring-line transition hover:ring-coral md:text-lg"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.cardSoft} ${meta.cardText} font-black transition group-hover:scale-110`}
              >
                {letters[index]}
              </span>
              {data.result}
            </button>
          ))}
        </div>

        <p className="mt-10 text-center text-sm font-semibold text-muted">
          💛 Зөв, буруу хариулт гэж байхгүй. Сүүлийн үеийн мэдрэмждээ тулгуурлаарай.
        </p>
      </div>
    </div>
  );
}
