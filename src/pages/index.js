"use client";

import { useEffect } from "react";
import { useUser } from "./Context/UserContext";
import { useRouter } from "next/router";
import Homepage from "./components/Homepage";

export default function Background() {
  const { user, setUser } = useUser();
  const router = useRouter();
  console.log("context", user);
  useEffect(() => {
    if (user == null) {
      router.push("/homepage");
    } else {
      router.push("/landingPage");
    }
    return () => {};
  }, [user]);
  return <Homepage />;
}
