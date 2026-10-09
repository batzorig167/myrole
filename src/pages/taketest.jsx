"use client";
import { useEffect, useState } from "react";
import { useUser } from "./Context/UserContext";
import { useRouter } from "next/router";
import { useScore } from "./Context/ScoreContext";
import { useCategory } from "./Context/CategoryContext";
import { useData } from "./Context/DataContext";
import { getTheme } from "@/lib/themes";
import { findLevel } from "@/lib/levels";

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
      <div className="flex h-screen items-center justify-center bg-cream text-muted">
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-10 text-ink">
      <div className="w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-line md:p-10">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${meta.soft} ${meta.text}`}
          >
            <meta.Icon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm text-muted">Сэдэв</p>
            <p className="font-serif text-lg font-semibold">{current.testName}</p>
          </div>
          <p className="ml-auto text-sm font-semibold text-muted">
            {qIndex + 1} / {total}
          </p>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-sand">
          <div
            className={`h-full rounded-full ${meta.bg} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <h1 className="mt-8 font-serif text-xl font-medium leading-relaxed md:text-2xl">
          {current.question[qIndex].replace(/^\d+\.\s*/, "")}
        </h1>

        <div className="mt-8 flex flex-col gap-3">
          {current.result.map((data, index) => {
            return (
              <button
                key={index}
                onClick={() => handleSubmit(data)}
                className="flex items-center gap-3 rounded-2xl border border-line bg-cream px-5 py-4 text-left text-base transition hover:border-sage hover:bg-sage-soft md:text-lg"
              >
                <span className="h-5 w-5 shrink-0 rounded-full border-2 border-muted/40" />
                {data.result}
              </button>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Зөв, буруу хариулт гэж байхгүй. Сүүлийн үеийн мэдрэмждээ тулгуурлаарай.
        </p>
      </div>
    </div>
  );
}
