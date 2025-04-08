import { useEffect } from "react";
import Challenge from "./components/Challenge";
import { useScore } from "./Context/ScoreContext";
import { useUser } from "./Context/UserContext";
import { useRouter } from "next/router";

export default function Home() {
  const { score, tuvshin } = useScore();
  const router = useRouter();
  const { testUser, setTestUser } = useUser();
  useEffect(() => {
    if (testUser == null) {
      router.push("/SignUp");
    }
  }, [testUser, router]);

  return (
    <div>
      {/* ene ni onoog harulj bsn  */}
      {/* <h1>{"ONoo:"+score}</h1>
        <h1>{"Tuvshin:"+tuvshinRank}</h1> */}
      <Challenge props={tuvshin} />
    </div>
  );
}
