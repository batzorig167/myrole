import "@/styles/globals.css";
import UserProvider from "./Context/UserContext";
import ScoreProvider from "./Context/ScoreContext";
import CategoryProvider from "./Context/CategoryContext";
import DataProvider from "./Context/DataContext";

export default function App({ Component, pageProps }) {
  return (
    <DataProvider>
      <UserProvider>
        <ScoreProvider>
          <CategoryProvider>
            <Component {...pageProps} />
          </CategoryProvider>
        </ScoreProvider>
      </UserProvider>
    </DataProvider>
  );
}
