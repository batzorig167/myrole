import { useRouter } from "next/router";
import Dashboard from "./components/Dashboard";
import Test from "./components/HomeTsesniihesg";
import { useUser } from "./Context/UserContext";
import { useEffect } from "react";

export default function Home() {
  const { user, setUser, loading } = useUser();
  const router = useRouter();
  //   console.log("dashboard=", user);
  useEffect(() => {
    if (!loading && user == null) {
      router.push("/homepage");
    }
  }, [user, loading]);
  if (loading) {
    return <p>Loading...</p>; // Энд spinner эсвэл loading text хийж болно
  }
  return (
    <div>
      <Dashboard />
    </div>
  );
}
