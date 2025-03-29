import "@/styles/globals.css";
import { UserProvider } from "./Context/UserContext";

export default function App({ Component, pageProps }) {
  return <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
}
