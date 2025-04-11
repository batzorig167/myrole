import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";

export default function StudentResult() {
  const [firstnameSortOrder, setFirstnameSortOrder] = useState("asc");

  const { user, setUser } = useUser();
  const [userData, setUserData] = useState([]);
  const [allUser, setAlluser] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uii, setUII] = useState();
  const [sg, setSG] = useState();
  const [tug, setTUG] = useState();
  const [stress, setStress] = useState();
  // console.log("sg=", sg);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/test-result");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const filterSchool = result.filter(
          (data) => data.school === user.school
        );
        setUserData(filterSchool);
        // сэтгэл гутгал дундаж
        let a = filterSchool.filter(
          (data) => data.category == null || data.category == "Сэтгэл гутрал"
        );
        let average = 0;
        for (let i = 0; i < a.length; i++) {
          average += a[i].score;
        }
        if (a.length != 0) {
          let score = average / a.length;
          if (score >= 0 && score < 5) {
            setSG("Хэвийн");
          } else if (score >= 5 && score < 7) {
            setSG("Хөнгөн");
          } else if (score >= 7 && score < 11) {
            setSG("Дунд зэрэг");
          } else if (score >= 11 && score < 14) {
            setSG("Хүчтэй");
          } else if (score >= 14) {
            setSG("Маш хүчтэй");
          }
        } else setSG("Хоосон");
        // стресс

        a = filterSchool.filter((data) => data.category == "Стресс");
        average = 0;
        for (let i = 0; i < a.length; i++) {
          average += a[i].score;
        }
        if (a.length != 0) {
          let score = average / a.length;
          if (score >= 0 && score < 8) {
            setStress("Хэвийн");
          } else if (score >= 8 && score < 10) {
            setStress("Хөнгөн");
          } else if (score >= 10 && score < 13) {
            setStress("Дунд зэрэг");
          } else if (score >= 13 && score < 17) {
            setStress("Хүчтэй");
          } else if (score >= 17) {
            setStress("Маш хүчтэй");
          }
        } else setStress("Хоосон");
        // Түгшүүр
        a = filterSchool.filter((data) => data.category == "Түгшүүр");
        average = 0;
        for (let i = 0; i < a.length; i++) {
          average += a[i].score;
        }
        if (a.length != 0) {
          let score = average / a.length;
          if (score >= 0 && score < 3) {
            setTUG("Хэвийн");
          } else if (score >= 3 && score < 6) {
            setTUG("Хөнгөн");
          } else if (score >= 6 && score < 8) {
            setTUG("Дунд зэрэг");
          } else if (score >= 8 && score < 10) {
            setTUG("Хүчтэй");
          } else if (score >= 10) {
            setTUG("Маш хүчтэй");
          }
        } else setTUG("Хоосон");
        // Өөртөө итгэх итгэл
        a = filterSchool.filter(
          (data) => data.category == "Өөртөө итгэх итгэл"
        );
        average = 0;
        for (let i = 0; i < a.length; i++) {
          average += a[i].score;
        }
        if (a.length != 0) {
          let score = average / a.length;
          if (score >= 0 && score < 30) {
            setUII("Итгэлгүй, эргэлзээтэй байдал");
          } else if (score >= 30 && score < 40) {
            setUII("Итгэлтэй, бие даасан байдал ");
          } else if (score >= 40 && score < 50) {
            setUII("Итгэлтэй, бие даасан байдал");
          } else if (score >= 50) {
            setUII("Өндөр түвшний өөртөө итгэх итгэл");
          }
        } else setUII("Хоосон");
        setAlluser(filterSchool);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    allUser.forEach((data) => {
      data.createdAt = new Date(data.createdAt).toLocaleString("mn-MN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    });

    const filteredData = allUser.filter(
      (item) =>
        Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(search.toLowerCase())
        ) ||
        item.challenge?.name
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
    );
    // сэтгэл гутгал дундаж

    let a = filteredData.filter(
      (data) => data.category == null || data.category == "Сэтгэл гутрал"
    );
    let average = 0;
    for (let i = 0; i < a.length; i++) {
      average += a[i].score;
    }
    if (a.length != 0) {
      let score = average / a.length;
      if (score >= 0 && score < 5) {
        setSG("Хэвийн");
      } else if (score >= 5 && score < 7) {
        setSG("Хөнгөн");
      } else if (score >= 7 && score < 11) {
        setSG("Дунд зэрэг");
      } else if (score >= 11 && score < 14) {
        setSG("Хүчтэй");
      } else if (score >= 14) {
        setSG("Маш хүчтэй");
      }
    } else setSG("Тест бөглөөгүй");
    // стресс

    a = filteredData.filter((data) => data.category == "Стресс");
    average = 0;
    for (let i = 0; i < a.length; i++) {
      average += a[i].score;
    }
    if (a.length != 0) {
      let score = average / a.length;
      if (score >= 0 && score < 8) {
        setStress("Хэвийн");
      } else if (score >= 8 && score < 10) {
        setStress("Хөнгөн");
      } else if (score >= 10 && score < 13) {
        setStress("Дунд зэрэг");
      } else if (score >= 13 && score < 17) {
        setStress("Хүчтэй");
      } else if (score >= 17) {
        setStress("Маш хүчтэй");
      }
    } else setStress("Тест бөглөөгүй");
    // Түгшүүр
    a = filteredData.filter((data) => data.category == "Түгшүүр");
    average = 0;
    for (let i = 0; i < a.length; i++) {
      average += a[i].score;
    }
    if (a.length != 0) {
      let score = average / a.length;
      if (score >= 0 && score < 3) {
        setTUG("Хэвийн");
      } else if (score >= 3 && score < 6) {
        setTUG("Хөнгөн");
      } else if (score >= 6 && score < 8) {
        setTUG("Дунд зэрэг");
      } else if (score >= 8 && score < 10) {
        setTUG("Хүчтэй");
      } else if (score >= 10) {
        setTUG("Маш хүчтэй");
      }
    } else setTUG("Тест бөглөөгүй");
    // Өөртөө итгэх итгэл
    a = filteredData.filter((data) => data.category == "Өөртөө итгэх итгэл");
    average = 0;
    for (let i = 0; i < a.length; i++) {
      average += a[i].score;
    }
    if (a.length != 0) {
      let score = average / a.length;
      if (score >= 0 && score < 30) {
        setUII("Итгэлгүй, эргэлзээтэй байдал");
      } else if (score >= 30 && score < 40) {
        setUII("Итгэлтэй, бие даасан байдал ");
      } else if (score >= 40 && score < 50) {
        setUII("Итгэлтэй, бие даасан байдал");
      } else if (score >= 50) {
        setUII("Өндөр түвшний өөртөө итгэх итгэл");
      }
    } else setUII("Тест бөглөөгүй");
    setUserData(filteredData);
  };

  const sortOvog = () => {
    const sortedData = [...userData].sort((a, b) => {
      if (firstnameSortOrder === "asc") {
        return a.lastname.localeCompare(b.lastname);
      } else {
        return b.lastname.localeCompare(a.lastname);
      }
    });
    setUserData(sortedData);
    setFirstnameSortOrder((prevOrder) =>
      prevOrder === "asc" ? "desc" : "asc"
    );
  };

  const sortFirstname = () => {
    const sortedData = [...userData].sort((a, b) => {
      if (firstnameSortOrder === "asc") {
        return a.firstname.localeCompare(b.firstname);
      } else {
        return b.firstname.localeCompare(a.firstname);
      }
    });

    setUserData(sortedData);

    // Sort order-оо ээлжлэн өөрчилнө
    setFirstnameSortOrder((prevOrder) =>
      prevOrder === "asc" ? "desc" : "asc"
    );
  };
  const classSort = () => {
    const sortedData = [...userData].sort((a, b) => {
      if (firstnameSortOrder === "asc") {
        return a.class.localeCompare(b.class);
      } else {
        return b.class.localeCompare(a.class);
      }
    });

    setUserData(sortedData);

    // Sort order-оо ээлжлэн өөрчилнө
    setFirstnameSortOrder((prevOrder) =>
      prevOrder === "asc" ? "desc" : "asc"
    );
  };
  const testSort = () => {
    const sortedData = [...userData].sort((a, b) => {
      if (firstnameSortOrder === "asc") {
        return a?.category.localeCompare(b?.category);
      } else {
        return b?.category.localeCompare(a?.category);
      }
    });

    setUserData(sortedData);

    // Sort order-оо ээлжлэн өөрчилнө
    setFirstnameSortOrder((prevOrder) =>
      prevOrder === "asc" ? "desc" : "asc"
    );
  };
  const sortDate = () => {
    const sortedData = [...userData].sort((a, b) => {
      if (firstnameSortOrder === "asc") {
        return a?.createdAt.localeCompare(b?.createdAt);
      } else {
        return b?.createdAt.localeCompare(a?.createdAt);
      }
    });

    setUserData(sortedData);

    // Sort order-оо ээлжлэн өөрчилнө
    setFirstnameSortOrder((prevOrder) =>
      prevOrder === "asc" ? "desc" : "asc"
    );
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className="w-full min-h-[100vh] flex justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <div className="flex  sm:flex-col justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">{user?.name}</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition duration-300"
          >
            Гарах
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-lg transition duration-300 border border-[#ecf0f1]">
            <h3 className="text-[black] text-sm mb-2">Сэтгэл гутрал дундаж</h3>
            <p className="text-2xl font-semibold text-[#FF6B6B]">{sg}</p>
          </div>

          <div className="bg-white  shadow-md rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-lg transition duration-300 border border-[#ecf0f1]">
            <h3 className="text-[black] text-sm mb-2">Түгшүүр</h3>
            <p className="text-2xl font-semibold text-[#FFA500]">{tug}</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-lg transition duration-300 border border-[#ecf0f1]">
            <h3 className="text-[black] text-sm mb-2">Стресс</h3>
            <p className="text-2xl font-semibold text-[#4A90E2]">{stress}</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-lg transition duration-300 border border-[#ecf0f1]">
            <h3 className="text-[black] text-sm mb-2">Өөртөө итгэх итгэл</h3>
            <p className="text-2xl font-semibold text-[#34D399]">{uii}</p>
          </div>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-row sm:flex-col gap-4 mb-6"
        >
          <input
            type="text"
            name="search"
            placeholder="Хайх..."
            className="flex-grow border border-[#ecf0f1]  bg-white  text-[black] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 transition duration-300"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Хайх
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-2">№</th>
                <th className="p-2 hidden md:table-cell">
                  <button onClick={sortOvog} className="hover:underline">
                    Овог
                  </button>
                </th>
                <th className="p-2">
                  <button onClick={sortFirstname} className="hover:underline">
                    Нэр
                  </button>
                </th>
                <th className="p-2">
                  <button onClick={classSort} className="hover:underline">
                    Анги
                  </button>
                </th>
                <th className="p-2">
                  <button className="hover:underline">Тест</button>
                </th>
                <th className="p-2">Тест даалгавар</th>
                {/* <th className="p-2">Оноо</th> */}
                <th className="p-2">Түвшин</th>
                <th className="p-2">
                  <button onClick={sortDate}>Огноо</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((data, index) => (
                <tr
                  key={index}
                  className="odd:bg-gray-50 even:bg-white text-center"
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 hidden md:table-cell">{data.lastname}</td>
                  <td className="p-2">{data.firstname}</td>
                  <td className="p-2">{data.class + data.buleg}</td>
                  <td className="p-2">{data?.category || "Сэтгэл гутрал"}</td>
                  <td className="p-2">
                    {data.challenge?.name || "Чалленж сонгоогүй"}
                  </td>
                  {/* <td className="p-2">{data.score}</td> */}
                  <td className="p-2">{data.tuvshin}</td>
                  <td className="p-2">
                    {new Date(data.createdAt).toLocaleString("mn-MN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
