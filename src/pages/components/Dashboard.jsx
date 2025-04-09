import Link from "next/link";
import Menu from "./Menu";
import Task from "./Task";
import Test from "./HomeTsesniihesg";
import Info from "./Info";
import { useState } from "react";
import Div from "./HomeTsesniihesg";
import HomeTsesniihesg from "./HomeTsesniihesg";
import Homepage from "./Homepage";
import LandingPage from "./LandingPage";
import { useUser } from "../Context/UserContext";
import StudentResult from "./StudentResult";

export default function Dashboard() {
  const { user, setUser } = useUser();
  const [selectItem, setSelectItem] = useState(null);
  function handleBtn() {
    setSelectItem(2);
  }
  function closeHandle() {
    setSelectItem(null);
  }
  return (
    <div className="bg-[white] max-auto-screen text-black ">
      <div className="flex justify-center  m-auto  ">
        <div className="w-[85%] ">
          <StudentResult />
        </div>
      </div>
    </div>
  );
}
