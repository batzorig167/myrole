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
    if (groundingStep < 4) {
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

  const phase = breathePhases[phaseIndex];

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header>
        <Link
          href="/homepage"
          className="rounded-full border border-ink/20 px-5 py-2 text-sm font-semibold transition hover:border-sage hover:text-sage"
        >
          Нүүр хуудас
        </Link>
      </Header>
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
        <div>
          <h1 className="font-serif text-3xl font-semibold md:text-4xl">
            Тайвшруулах дасгалууд
          </h1>
          <p className="mt-2 text-muted">
            Хэдхэн минут зарцуулж бие, сэтгэлээ амраагаарай.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Амьсгал */}
          <div className="flex flex-col items-center rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-line">
            <h2 className="self-start font-serif text-2xl font-semibold">
              Амьсгалын дасгал
            </h2>
            <p className="self-start text-sm text-muted">4 – 7 – 8 арга</p>
            <div className="my-8 flex h-56 w-56 items-center justify-center rounded-full bg-sage-soft">
              <div
                className="flex h-48 w-48 flex-col items-center justify-center rounded-full bg-sage text-white ease-in-out"
                style={{
                  transform: `scale(${breathing ? phase.scale : 0.75})`,
                  transitionProperty: "transform",
                  transitionDuration: breathing ? `${phase.count}s` : "0.6s",
                }}
              >
                {breathing ? (
                  <>
                    <span className="text-sm">{phase.label}</span>
                    <span className="font-serif text-4xl">{counter}</span>
                  </>
                ) : (
                  <span>Бэлэн үү?</span>
                )}
              </div>
            </div>
            {!breathing ? (
              <button
                className="rounded-full bg-sage px-6 py-2.5 font-semibold text-white transition hover:bg-sage-dark"
                onClick={startBreathing}
              >
                Дасгалыг эхлэх
              </button>
            ) : (
              <button
                className="rounded-full bg-sand px-6 py-2.5 font-semibold text-ink transition hover:bg-line"
                onClick={stopBreathing}
              >
                Дасгалыг зогсоох
              </button>
            )}
          </div>

          {/* 5-4-3-2-1 */}
          <div className="flex flex-col rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-line">
            <h2 className="font-serif text-2xl font-semibold">Төвлөрөх мөч</h2>
            <p className="text-sm text-muted">
              5-4-3-2-1 арга — мэдрэхүйгээрээ одоо цагтаа эргэн ирэх
            </p>
            {!showGrounding ? (
              <div className="flex flex-1 flex-col items-start justify-center gap-4 py-6">
                <p className="leading-relaxed text-ink/80">
                  Санаа зовнил ихсэх үед эргэн тойрондоо харж, сонсож, мэдэрч буй
                  зүйлсээ нэрлэх нь сэтгэлийг тайвшруулдаг.
                </p>
                <button
                  className="rounded-full bg-lavender px-6 py-2.5 font-semibold text-white transition hover:opacity-90"
                  onClick={handleGroundingStart}
                >
                  Эхлэх
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="flex gap-1.5">
                  {groundingPrompts.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${
                        i <= groundingStep ? "bg-lavender" : "bg-sand"
                      }`}
                    />
                  ))}
                </div>
                <label className="block font-semibold">
                  {groundingPrompts[groundingStep]}
                  <input
                    type="text"
                    value={groundingInputs[groundingStep]}
                    onChange={handleGroundingChange}
                    className="mt-2 w-full rounded-xl border border-line bg-cream p-3 font-normal focus:border-lavender focus:outline-none focus:ring-2 focus:ring-lavender/30"
                  />
                </label>
                {groundingStep < 4 ? (
                  <button
                    className="rounded-full bg-lavender px-5 py-2.5 font-semibold text-white transition hover:opacity-90"
                    onClick={nextGroundingStep}
                  >
                    Дараах
                  </button>
                ) : (
                  <p className="rounded-2xl bg-sage-soft px-4 py-3 font-semibold text-sage-dark">
                    Та төвлөрөх дасгалаа амжилттай дуусгалаа!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Тэмдэглэл */}
        <div className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-line">
          <h2 className="font-serif text-2xl font-semibold">Өдрийн тэмдэглэл</h2>
          <p className="text-sm text-muted">
            Бодол, мэдрэмжээ үгээр илэрхийлэх нь тэдгээрийг ойлгоход тусалдаг.
          </p>
          <textarea
            rows={8}
            className="mt-4 w-full rounded-2xl border border-line bg-cream p-4 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
            placeholder="Өнөөдөр юу болсон, юу мэдэрсэн, юу бодож байна вэ? Энд бичээрэй..."
          />
        </div>
      </div>
    </div>
  );
}
