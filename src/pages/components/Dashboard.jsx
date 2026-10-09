import { useState } from "react";
import Link from "next/link";
import StudentResult from "./StudentResult";
import { HeartIcon } from "./Header";
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
  const current = tabs.find((tab) => tab.key === active) || tabs[0];
  const { Component } = current;

  return (
    <div className="min-h-screen bg-slate-50 font-ui text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-100">
              <HeartIcon className="h-4.5 w-4.5" />
            </span>
            <span className="text-sm font-semibold">Сэтгэлийн найз</span>
            <span className="hidden text-sm text-slate-400 sm:inline">/ Удирдлагын самбар</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActive("profile")}
              title="Профайл"
              className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-100"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                {(user?.name || user?.username || "?").slice(0, 1).toUpperCase()}
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-sm font-medium">{user?.name || user?.username}</span>
                <span className="block text-xs text-slate-500">{ROLES[user?.role]}</span>
              </span>
            </button>
            <button
              onClick={logout}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Гарах
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition ${
                current.key === tab.key
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Component />
      </main>
    </div>
  );
}
