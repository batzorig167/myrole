import "@/styles/globals.css";
import { UserProvider } from "./Context/UserContext";
import { ScoreProvider } from "./Context/ScoreContext";

export default function App({ Component, pageProps }) {
  return <UserProvider>
    <ScoreProvider>

      <Component {...pageProps} />
    </ScoreProvider>
  </UserProvider>

}
