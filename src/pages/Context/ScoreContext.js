const { createContext, Children, useState, useContext } = require("react");

const ScoreContext = createContext();

const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [tuvshin, setTuvshin] = useState([]);
  const [tuvshinRank, setTuvshinRank] = useState();
  return (
    <ScoreContext.Provider
      value={{
        tuvshinRank,
        setTuvshinRank,
        score,
        setScore,
        tuvshin,
        setTuvshin,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
export default ScoreProvider;
export const useScore = () => useContext(ScoreContext);
