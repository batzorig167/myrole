import { useState } from "react";
import { useScore } from "../Context/ScoreContext";
import { useRouter } from "next/router";
import { useUser } from "../Context/UserContext";
import { useCategory } from "../Context/CategoryContext";

export default function Challenge({ props }) {
  const [selectItem, setSelectItem] = useState(null);
  const { catIndex } = useCategory();
  const { score, tuvshin, tuvshinRank } = useScore();
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

    let categoryName = [
      "Сэтгэл гутрал",
      "Түгшүүр",
      "Стресс",
      "Өөртөө итгэх итгэл",
    ][catIndex];

    const postData = {
      ...testUser,
      tuvshin: tuvshinRank,
      challenge: selectItem,
      category: categoryName,
    };

    console.log("Илгээж буй дата:", postData);

    try {
      const response = await fetch("/api/test-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      console.log(data);

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

  if (!props || !Array.isArray(props)) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#e3f6f5]">
        <div className="text-center text-[#272343] animate-pulse text-xl">
          Ачааллаж байна...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-gradient-to-tr from-[#e3f6f5] to-[#bae8e8] p-4">
      <h1 className="text-2xl md:text-3xl font-semibold text-[#272343] text-center">
        Таны сэтгэл зүйн түвшин:{" "}
        <span className="text-[#ffd803]">{tuvshinRank}</span>
      </h1>
      <h2 className="text-xl md:text-2xl text-[#272343] text-center">
        Танд санал болгох чалленж даалгаврууд
      </h2>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {props.map((data, index) => (
          <button
            key={index}
            className="bg-white text-[#272343] border border-[#272343] rounded-full py-3 px-6 text-lg hover:bg-[#ffd803] hover:text-[#272343] shadow-md transition-all duration-300"
            onClick={() => handleBtn(data)}
          >
            {data.name}
          </button>
        ))}
      </div>

      {selectItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl animate-fade-in-down space-y-6 relative">
            {/* Close button */}
            <button
              onClick={closeHandle}
              className="absolute top-4 right-4 text-[#272343] hover:text-red-500 transition"
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

            {/* Modal Content */}
            <h2 className="text-2xl font-bold text-[#272343]">
              {selectItem.name}
            </h2>

            <div className="text-[#272343] space-y-3">
              <p>
                <strong>Даалгавар:</strong> {selectItem.daalgavar}
              </p>

              {selectItem.example.length > 0 && (
                <div>
                  <p>
                    <strong>Жишээ:</strong>
                  </p>
                  <ul className="list-disc list-inside text-sm pl-4">
                    {selectItem.example.map((ex, idx) => (
                      <li key={idx}>{ex}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p>
                <strong>Зорилго:</strong> {selectItem.zorilgo}
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                onClick={chooseHandle}
                className="bg-[#2ecc71] text-white px-4 py-2 rounded-lg hover:bg-[#27ae60] transition"
                disabled={loading} // Ачаалалтай үед товчийг идэвхгүй болгоно
              >
                {loading ? "Ачааллаж байна..." : "Сонгох"}
              </button>
              <button
                onClick={closeHandle}
                className="bg-[#bae8e8] text-[#272343] px-4 py-2 rounded-lg hover:bg-[#a0d2d2] transition"
              >
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white">Ачааллаж байна...</div>
        </div>
      )}
    </div>
  );
}
