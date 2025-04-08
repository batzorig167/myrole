import { useState } from "react";
import { useScore } from "../Context/ScoreContext";
import { useRouter } from "next/router";
import { useUser } from "../Context/UserContext";
export default function Challenge({ props }) {
  const [result, setResult] = useState([]);
  const { score, tuvshin, tuvshinRank } = useScore();
  const { testUser, setTestUser } = useUser();
  const [selectItem, setSelectItem] = useState(null);
  const router = useRouter();
  // console.log("urdun=", testUser);
  function handleBtn(item) {
    setSelectItem(item);
  }
  function closeHandle() {
    setSelectItem(null);
  }
  function Btn() {
    router.push("/landingPage");
  }
  function chooseHandle() {
    setTestUser({ ...testUser, tuvshin: tuvshinRank, challenge: selectItem });
    handleSubmit();
  }
  if (!props || !Array.isArray(props)) {
    return <div>Loading...</div>; // Өгөгдөл ирэх хүртэл ачааллаж байна гэж үзүүлнэ
  }
  const handleSubmit = async () => {
    // e.preventDefault();
    // alert(ilgeelee)
    console.log("ilgeej bui data=", {
      ...testUser,
      tuvshin: tuvshinRank,
      challenge: selectItem,
    });
    const response = await fetch("/api/test-result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...testUser,
        tuvshin: tuvshinRank,
        challenge: selectItem,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      alert("Post added successfully!");
    } else {
      alert("Error: " + data.message);
    }
    setSelectItem(null);
    Btn();
  };
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center gap-2 bg-[#e3f6f5]">
      <h1 className="md:text-xl flex justify-center text-[#272343]">
        {"Таны сэтгэл зүйн түвшин:" + tuvshinRank}
      </h1>
      <h1 className="md:text-xl flex justify-center text-[#272343]">
        Танд санал болгох чалленж даалгаврууд
      </h1>
      {/* <h1 className="text-xl">{"оноо:"+score}</h1> */}

      <div className="flex flex-col gap-5 items-center">
        {props.map((data, index) => {
          return (
            <div key={index}>
              <button
                className="text-center border border-[#272343] text-base px-[60px] py-[10px] w-80 md:w-130 md:text-xl rounded-full text-[#272343] bg-[#fffffe] max-w-[700px]"
                onClick={() => handleBtn(data)}
              >
                {data.name}
              </button>
            </div>
          );
        })}
      </div>
      {selectItem && (
        <div className="fixed top-0 left-0 w-full h-full z-50">
          {/* Overlay dark blur */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-60"
            onClick={closeHandle}
          />

          {/* Modal */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl bg-white rounded-2xl shadow-2xl p-6 z-50 transition-all duration-300 animate-fade-in-down">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-2xl font-semibold text-[#272343]">
                {selectItem.name}
              </h2>
              <button
                onClick={closeHandle}
                className="text-[#272343] hover:text-red-500 transition"
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
            </div>

            {/* Body */}
            <div className="text-[#272343] space-y-3">
              <p>
                <strong>Даалгавар:</strong> {selectItem.daalgavar}
              </p>

              {selectItem.example.length > 0 && (
                <>
                  <p>
                    <strong>Жишээ:</strong>
                  </p>
                  <ul className="list-disc list-inside pl-2 text-sm">
                    {selectItem.example.map((ex, idx) => (
                      <li key={idx}>- {ex}</li>
                    ))}
                  </ul>
                </>
              )}

              <p>
                <strong>Зорилго:</strong> {selectItem.zorilgo}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={chooseHandle}
                className="px-4 py-2 bg-[#2ecc71] text-[#fff] rounded-lg hover:bg-[#a0d2d2] transition"
              >
                Сонгох
              </button>
              <button
                onClick={closeHandle}
                className="px-4 py-2 bg-[#bae8e8] text-[#272343] rounded-lg hover:bg-[#a0d2d2] transition"
              >
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="pt-3">
        <button
          className="md:text-xl md:px-5 rounded-lg py-1 px-10  bg-[#ffd803]"
          onClick={Btn}
        >
          Нүүр хэсэг лүү буцах
        </button>
      </div>
    </div>
  );
}
