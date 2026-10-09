import { useRouter } from "next/router";
import Dashboard from "./components/Dashboard";
import { useUser } from "./Context/UserContext";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!loading && user == null) {
      router.push("/login");
    }
  }, [user, loading, router]);
  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-cream text-muted">
        Ачааллаж байна...
      </div>
    );
  }
  return (
    <div>
      <Dashboard />
    </div>
  );
}
