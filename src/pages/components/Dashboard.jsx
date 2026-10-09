import { useState } from "react";
import StudentResult from "./StudentResult";
import Header from "./Header";
import { useUser } from "../Context/UserContext";
import { ROLES } from "@/lib/roles";
import TestsAdmin from "@/components/admin/TestsAdmin";
import ChallengesAdmin from "@/components/admin/ChallengesAdmin";
import SchoolsAdmin from "@/components/admin/SchoolsAdmin";
import UsersAdmin from "@/components/admin/UsersAdmin";
import Profile from "@/components/admin/Profile";

// Админ бүх табыг, сургууль (сэтгэл зүйч) үр дүн болон профайлаа харна.
const TABS = [
  { key: "results", emoji: "📊", label: "Үр дүн", Component: StudentResult, roles: ["admin", "psychologist"] },
  { key: "tests", emoji: "🧩", label: "Тестүүд", Component: TestsAdmin, roles: ["admin"] },
  { key: "challenges", emoji: "🎯", label: "Даалгаврууд", Component: ChallengesAdmin, roles: ["admin"] },
  { key: "schools", emoji: "🏫", label: "Сургуулиуд", Component: SchoolsAdmin, roles: ["admin"] },
  { key: "users", emoji: "👥", label: "Хэрэглэгч ба эрх", Component: UsersAdmin, roles: ["admin"] },
  { key: "profile", emoji: "🙂", label: "Профайл", Component: Profile, roles: ["admin", "psychologist"] },
];

export default function Dashboard() {
  const { user, logout } = useUser();
  const tabs = TABS.filter((tab) => tab.roles.includes(user?.role));
  const [active, setActive] = useState("results");
  if (tabs.length === 0) return null;
  const { Component } = tabs.find((tab) => tab.key === active) || tabs[0];

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header wide>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActive("profile")}
            title="Профайл"
            className="flex items-center gap-2 rounded-2xl py-1 pl-1 pr-3 transition hover:bg-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-grape text-lg font-black text-white">
              {(user?.name || user?.username || "?").slice(0, 1).toUpperCase()}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-black">{user?.name || user?.username}</span>
              <span className="block text-xs font-semibold text-muted">{ROLES[user?.role]}</span>
            </span>
          </button>
          <button
            onClick={logout}
            className="pop rounded-full bg-white px-4 py-2 text-sm font-bold ring-2 ring-line hover:text-rose"
          >
            Гарах
          </button>
        </div>
      </Header>
      <div className="mx-auto max-w-7xl px-4 pb-12">
        <nav className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const on = (tabs.find((t) => t.key === active) || tabs[0]).key === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition ${
                  on
                    ? "pop bg-ink text-white [--edge:#000]"
                    : "bg-white text-muted ring-2 ring-line hover:text-ink"
                }`}
              >
                <span className="mr-1.5" aria-hidden="true">
                  {tab.emoji}
                </span>
                {tab.label}
              </button>
            );
          })}
        </nav>
        <div className="rounded-[2.5rem] bg-white p-5 ring-2 ring-line md:p-8">
          <Component />
        </div>
      </div>
    </div>
  );
}
