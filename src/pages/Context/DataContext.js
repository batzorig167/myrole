const {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} = require("react");

const DataContext = createContext();

// Тест, даалгавар, сургуулийн мэдээллийг DB-ээс (/api/content) уншина.
const DataProvider = ({ children }) => {
  const [test, setTest] = useState([]);
  const [challenge, setChallenge] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    try {
      const response = await fetch("/api/content");
      if (!response.ok) throw new Error("Өгөгдөл ачаалж чадсангүй");
      const data = await response.json();
      setTest(data.tests);
      // challenge[i] нь test[i]-ийн даалгаврууд (хуучин бүтэцтэй ижил)
      setChallenge(
        data.tests.map((t) => ({ category: t.testName, challenge: t.challenges }))
      );
      setSchools(data.schools);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <DataContext.Provider
      value={{ test, challenge, schools, loading, error, reload }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;
export const useData = () => useContext(DataContext);
