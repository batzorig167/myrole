import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "./Header";

export default function Dasgal() {
  const breathePhases = [
    { label: "Амьсгалаа ав", count: 4, scale: 1 },
    { label: "Амьсгалаа барь", count: 7, scale: 1 },
    { label: "Амьсгалаа гарга", count: 8, scale: 0.6 },
  ];

  const [breathing, setBreathing] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [groundingStep, setGroundingStep] = useState(0);
  const [groundingInputs, setGroundingInputs] = useState(["", "", "", "", ""]);
  const [showGrounding, setShowGrounding] = useState(false);

  useEffect(() => {
    let timer;
    if (breathing && counter < breathePhases[phaseIndex].count) {
      timer = setTimeout(() => setCounter(counter + 1), 1000);
    } else if (breathing) {
      timer = setTimeout(() => {
        const nextIndex = (phaseIndex + 1) % breathePhases.length;
        setPhaseIndex(nextIndex);
        setCounter(0);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [breathing, counter, phaseIndex]);

  const startBreathing = () => {
    setBreathing(true);
    setPhaseIndex(0);
    setCounter(0);
  };

  const stopBreathing = () => {
    setBreathing(false);
    setCounter(0);
    setPhaseIndex(0);
  };

  const handleGroundingStart = () => {
    setShowGrounding(true);
    setGroundingStep(0);
    setGroundingInputs(["", "", "", "", ""]);
  };

  const handleGroundingChange = (e) => {
    const updated = [...groundingInputs];
    updated[groundingStep] = e.target.value;
    setGroundingInputs(updated);
  };

  const nextGroundingStep = () => {
    if (groundingStep < 5) {
      setGroundingStep(groundingStep + 1);
    }
  };

  const groundingPrompts = [
    "5 зүйл харж байна:",
    "4 зүйл мэдэрч байна:",
    "3 зүйл сонсож байна:",
    "2 зүйл үнэрлэж байна:",
    "1 зүйл амтагдаж байна:",
  ];
  const groundingEmoji = ["👀", "✋", "👂", "👃", "👅"];

  const phase = breathePhases[phaseIndex];
  const groundingDone = showGrounding && groundingStep === 5;

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header>
        <Link
          href="/homepage"
          className="pop rounded-full bg-white px-5 py-2 text-sm font-bold ring-2 ring-line"
        >
          🏠 Нүүр
        </Link>
      </Header>
      <main className="mx-auto max-w-6xl space-y-6 px-4 pb-16 pt-4">
        <div className="text-center">
          <h1 className="text-4xl font-black md:text-5xl">Түр амсхийе 🫧</h1>
          <p className="mt-2 text-lg font-medium text-muted">
            Хэдхэн минут зарцуулж бие, сэтгэлээ амраагаарай.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Амьсгал */}
          <section className="relative flex flex-col items-center overflow-hidden rounded-[2.5rem] bg-ink p-7 text-white">
            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-grape/30" />
            <h2 className="relative self-start text-2xl font-black">🌬️ Амьсгалын дасгал</h2>
            <p className="relative self-start font-medium text-white/70">
              4 тоолж ав · 7 тоолж барь · 8 тоолж гарга
            </p>
            <div className="relative my-8 flex h-60 w-60 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-mint/15" />
              <div
                className="flex h-52 w-52 flex-col items-center justify-center rounded-full bg-mint text-ink ease-in-out"
                style={{
                  transform: `scale(${breathing ? phase.scale : 0.75})`,
                  transitionProperty: "transform",
                  transitionDuration: breathing ? `${phase.count}s` : "0.6s",
                }}
              >
                {breathing ? (
                  <>
                    <span className="font-black">{phase.label}</span>
                    <span className="text-6xl font-black">{counter}</span>
                  </>
                ) : (
                  <span className="text-lg font-black">Бэлэн үү?</span>
                )}
              </div>
            </div>
            {!breathing ? (
              <button
                className="pop relative rounded-2xl bg-sun px-7 py-3.5 font-black text-ink [--edge:#e0a800]"
                onClick={startBreathing}
              >
                Эхлэх ▶
              </button>
            ) : (
              <button
                className="pop relative rounded-2xl bg-white px-7 py-3.5 font-black text-ink [--edge:#cfc6b4]"
                onClick={stopBreathing}
              >
                Зогсоох ■
              </button>
            )}
          </section>

          {/* 5-4-3-2-1 */}
          <section className="flex flex-col rounded-[2.5rem] bg-grape-soft p-7">
            <h2 className="text-2xl font-black">🖐️ Төвлөрөх мөч</h2>
            <p className="font-medium text-muted">
              5-4-3-2-1 арга — мэдрэхүйгээрээ одоо цагтаа эргэн ирэх
            </p>
            {!showGrounding ? (
              <div className="flex flex-1 flex-col items-start justify-center gap-5 py-6">
                <p className="text-lg font-semibold leading-relaxed">
                  Санаа зовнил ихсэх үед эргэн тойрондоо харж, сонсож, мэдэрч буй
                  зүйлсээ нэрлэх нь сэтгэлийг тайвшруулдаг.
                </p>
                <div className="flex gap-2 text-3xl" aria-hidden="true">
                  {groundingEmoji.map((e) => (
                    <span key={e}>{e}</span>
                  ))}
                </div>
                <button
                  className="pop rounded-2xl bg-grape px-7 py-3.5 font-black text-white [--edge:#6d3fd6]"
                  onClick={handleGroundingStart}
                >
                  Эхлэх ▶
                </button>
              </div>
            ) : (
              <div className="mt-6 flex flex-1 flex-col gap-4">
                <div className="flex gap-2">
                  {groundingPrompts.map((_, i) => (
                    <span
                      key={i}
                      className={`flex h-10 flex-1 items-center justify-center rounded-xl text-lg transition ${
                        i <= groundingStep ? "bg-grape" : "bg-white"
                      }`}
                    >
                      {groundingEmoji[i]}
                    </span>
                  ))}
                </div>
                {groundingDone ? (
                  <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-white p-6 text-center">
                    <span className="text-5xl">🌟</span>
                    <p className="text-xl font-black">Гайхалтай!</p>
                    <p className="font-medium text-muted">
                      Чи одоо цагтаа эргэн ирлээ. Хэдэн удаа ч давтаж болно.
                    </p>
                    <button
                      onClick={handleGroundingStart}
                      className="mt-2 font-black text-grape underline"
                    >
                      Дахин хийх
                    </button>
                  </div>
                ) : (
                  <>
                    <label className="block text-lg font-black">
                      {groundingEmoji[groundingStep]} {groundingPrompts[groundingStep]}
                      <input
                        type="text"
                        value={groundingInputs[groundingStep]}
                        onChange={handleGroundingChange}
                        onKeyDown={(e) => e.key === "Enter" && nextGroundingStep()}
                        placeholder="Энд бичээрэй..."
                        className="mt-2 w-full rounded-2xl border-2 border-white bg-white p-4 font-semibold focus:border-grape focus:outline-none"
                      />
                    </label>
                    <button
                      className="pop self-start rounded-2xl bg-grape px-6 py-3 font-black text-white [--edge:#6d3fd6]"
                      onClick={nextGroundingStep}
                    >
                      {groundingStep < 4 ? "Дараах →" : "Дуусгах ✓"}
                    </button>
                  </>
                )}
              </div>
            )}
          </section>
        </div>

        {/* Тэмдэглэл */}
        <section className="rounded-[2.5rem] bg-sun-soft p-7">
          <h2 className="text-2xl font-black">📔 Өдрийн тэмдэглэл</h2>
          <p className="font-medium text-muted">
            Бодол, мэдрэмжээ үгээр илэрхийлэх нь тэдгээрийг ойлгоход тусалдаг. Энд
            бичсэн зүйл хаана ч хадгалагдахгүй.
          </p>
          <textarea
            rows={7}
            className="mt-4 w-full rounded-2xl border-2 border-white bg-white p-5 font-semibold focus:border-sun focus:outline-none"
            placeholder="Өнөөдөр юу болсон, юу мэдэрсэн, юу бодож байна вэ? Энд бичээрэй..."
          />
        </section>
      </main>
    </div>
  );
}
