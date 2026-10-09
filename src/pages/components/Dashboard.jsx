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
  { key: "results", label: "Үр дүн", Component: StudentResult, roles: ["admin", "psychologist"] },
  { key: "tests", label: "Тестүүд", Component: TestsAdmin, roles: ["admin"] },
  { key: "challenges", label: "Даалгаврууд", Component: ChallengesAdmin, roles: ["admin"] },
  { key: "schools", label: "Сургуулиуд", Component: SchoolsAdmin, roles: ["admin"] },
  { key: "users", label: "Хэрэглэгч ба эрх", Component: UsersAdmin, roles: ["admin"] },
  { key: "profile", label: "Профайл", Component: Profile, roles: ["admin", "psychologist"] },
];

export default function Dashboard() {
  const { user, logout } = useUser();
  const tabs = TABS.filter((tab) => tab.roles.includes(user?.role));
  const [active, setActive] = useState("results");
  if (tabs.length === 0) return null;
  const { Component } = tabs.find((tab) => tab.key === active) || tabs[0];

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActive("profile")}
            title="Профайл"
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition hover:bg-sand"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage font-semibold text-white">
              {(user?.name || user?.username || "?").slice(0, 1).toUpperCase()}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-semibold">
                {user?.name || user?.username}
              </span>
              <span className="block text-xs text-muted">{ROLES[user?.role]}</span>
            </span>
          </button>
          <button
            onClick={logout}
            className="rounded-full border border-ink/20 px-5 py-2 text-sm font-semibold transition hover:border-rose hover:text-rose"
          >
            Гарах
          </button>
        </div>
      </Header>
      <div className="mx-auto max-w-7xl px-4 py-6">
        {tabs.length > 1 && (
          <nav className="mb-6 flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active === tab.key
                    ? "bg-sage text-white"
                    : "bg-white text-muted ring-1 ring-line hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        )}
        <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-line md:p-8">
          <Component />
        </div>
      </div>
    </div>
  );
}
