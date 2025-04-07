import "@/styles/globals.css";
import { UserProvider } from "./Context/UserContext";
import { ScoreProvider } from "./Context/ScoreContext";
import { CategoryProvider } from "./Context/CategoryContext";

export default function App({ Component, pageProps }) {
  return <UserProvider>
    <ScoreProvider>
      <CategoryProvider>
      <Component {...pageProps} />
      </CategoryProvider>
    </ScoreProvider>
  </UserProvider>

}
