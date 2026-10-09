const { createContext, useContext, useState, useEffect } = require("react");

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [testUser, setTestUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Нэвтэрсэн эсэхийг серверийн session cookie-оор шалгана.
  useEffect(() => {
    localStorage.removeItem("user"); // хуучин хувилбарын үлдэгдэл
    fetch("/api/auth/me")
      .then((response) => (response.ok ? response.json() : { user: null }))
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, testUser, setTestUser, loading, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
export const useUser = () => useContext(UserContext);
