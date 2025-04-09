"use client";

import { useEffect } from "react";
import { useUser } from "./Context/UserContext";
import { useRouter } from "next/router";
import Homepage from "./components/Homepage";

export default function Background() {
  const { user, setUser } = useUser();
  return <Homepage />;
}
