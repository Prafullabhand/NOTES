import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.isAdmin === true;

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">OnlyNotes</h1>

        <div className="flex items-center gap-4">
          {isAdmin && (
            <button
              onClick={() => nav("/admin/upload")}
              className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-semibold">
              Upload Notes
            </button>
          )}
           {isAdmin && (
  <button
    onClick={() => nav("/admin/panel")}
    className="border border-emerald-500 px-5 py-2 rounded-lg">
    Admin Panel
  </button>
)}

          <button
            onClick={() => {
              localStorage.clear();
              nav("/");
            }}
            className="border border-slate-700 px-5 py-2 rounded-lg">
            Logout
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-12">
        <h2 className="text-3xl font-bold mb-6">
          Welcome, {user?.name}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div
            onClick={() => nav("/notes/it-2019")}
            className="cursor-pointer bg-black border border-slate-800 hover:border-emerald-500 p-8 rounded-2xl transition">
            <h3 className="text-xl font-semibold">SPPU IT-2019 Pattern</h3>
            <p className="text-slate-400 mt-2">Semester wise notes</p>
          </div>

          <div className="bg-black border border-slate-800 p-8 rounded-2xl opacity-40">
            <h3 className="text-xl font-semibold">More Patterns</h3>
            <p className="text-slate-500 mt-2">Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
