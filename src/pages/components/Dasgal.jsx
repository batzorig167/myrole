import React, { useState, useEffect } from "react";

export default function Dasgal() {
  const breathePhases = [
    { label: "Амьсгалаа ав", count: 4, color: "text-green-400", animation: "animate-pulse" },
    { label: "Амьсгалаа барь", count: 7, color: "text-yellow-400", animation: "animate-pulse" },
    { label: "Амьсгалаа гарга", count: 8, color: "text-blue-400", animation: "animate-pulse" },
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

  return (
    <div className="bg-[#232946] min-h-screen py-6 px-4 md:px-10 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 1. Breath + Grounding */}
        <h1 className="text-3xl text-center">Тайвшруулах дасгалууд</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Амьсгал */}
          <div className="bg-white rounded-2xl p-6 shadow-md text-black flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Амьсгалын дасгал</h1>
            <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-purple-800 to-indigo-700 flex flex-col items-center justify-center text-xl font-bold">
              {breathing ? (
                <>
                  <span className="text-sm text-white mb-1">{breathePhases[phaseIndex].label}</span>
                  <span className="text-3xl">{counter}</span>
                </>
              ) : (
                <span className="text-white">Бэлэн үү?</span>
              )}
            </div>
            {!breathing ? (
              <button className="mt-6 bg-gray-800 px-6 py-2 rounded-xl text-white" onClick={startBreathing}>
                Дасгалыг эхлэх
              </button>
            ) : (
              <button className="mt-6 bg-red-700 px-6 py-2 rounded-xl text-white" onClick={stopBreathing}>
                Дасгалыг зогсоох
              </button>
            )}
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md text-black">
            <h3 className="text-2xl font-bold mb-4">🧠 Төвлөрөх мөч: 5-4-3-2-1</h3>
            {!showGrounding ? (
              <button className="bg-purple-700 py-2 px-6 rounded-xl text-white" onClick={handleGroundingStart}>
                Дүүргэх
              </button>
            ) : (
              <div className="space-y-4">
                <label className="block text-sm">
                    {groundingPrompts[groundingStep]}
                    <input type="text" value={groundingInputs[groundingStep]} onChange={handleGroundingChange} className="w-full mt-1 p-2 rounded bg-gray-800 text-white"/>
                </label>
                {groundingStep < 4 ? (
                <button className="bg-purple-600 px-4 py-2 rounded-xl text-white" onClick={nextGroundingStep}> Дараах </button>
                ) : (
                <p className="text-green-600 font-semibold">Та төвлөрөх дасгалаа амжилттай дуусгалаа! 👏</p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg text-black">
            <h2 className="text-xl font-bold mb-4">📔 Өдрийн тэмдэглэл</h2>
            <textarea rows={10} className="w-full p-4 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Өнөөдөр юу болсон, юу мэдэрсэн, юу бодож байна вэ? Энд бичээрэй..."/>
        </div>
        <div className="flex justify-center">
            <a href="/homepage" className="bg-red-600 text-white py-3 px-10 rounded-[18px] shadow-lg"> Гарах </a>
        </div>
      </div>
    </div>
  );
}
