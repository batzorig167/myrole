import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";

export default function StudentResult() {
  const { user, setUser } = useUser();
  const [userData, setUserData] = useState([]);
  const [allUser, setAlluser] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log(filterSchool);
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
    setUserData(filteredData);
  };

  const sortOvog = () => {
    const sortedData = [...userData].sort((a, b) =>
      a.lastname.localeCompare(b.lastname)
    );
    setUserData(sortedData);
  };

  const sortFirstname = () => {
    const sortedData = [...userData].sort((a, b) =>
      a.firstname.localeCompare(b.firstname)
    );
    setUserData(sortedData);
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
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">{user?.name}</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition duration-300"
          >
            Гарах
          </button>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <input
            type="text"
            name="search"
            placeholder="Хайх..."
            className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow transition duration-300"
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
                <th className="p-2">Анги</th>
                <th className="p-2">Тест</th>
                <th className="p-2">Оноо</th>
                <th className="p-2">Түвшин</th>
                <th className="p-2">Огноо</th>
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
                  <td className="p-2">
                    {data.challenge?.name || "Чалленж сонгоогүй"}
                  </td>
                  <td className="p-2">{data.score}</td>
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
