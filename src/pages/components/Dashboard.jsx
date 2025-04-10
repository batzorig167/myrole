import StudentResult from "./StudentResult";

export default function Dashboard() {
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
