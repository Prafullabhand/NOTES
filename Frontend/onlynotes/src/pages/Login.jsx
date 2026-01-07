import { useState } from "react";
import axios from "axios";

export default function Login() {

  // Auto redirect if already logged in
  if (localStorage.getItem("token")) location = "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("https://notes-backend-50p.onrender.com/api/auth/login", {

        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      location = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <form autoComplete="off" className="w-full max-w-md bg-[#020617] border border-slate-800 rounded-2xl shadow-2xl p-10">

        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          OnlyNotes
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Admin curated academic notes platform
        </p>

        <input
          type="text"
          name="new-email"
          autoComplete="off"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 bg-black text-white rounded-xl border border-slate-700 mb-4 outline-none"
        />

        <input
          type="password"
          name="new-password"
          autoComplete="new-password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 bg-black text-white rounded-xl border border-slate-700 mb-6 outline-none"
        />

        <button
          type="button"
          onClick={login}
          className="w-full bg-emerald-600 hover:bg-emerald-500 p-3 rounded-xl font-semibold text-black"
        >
          Login
        </button>

        <p
          onClick={() => location = "/register"}
          className="text-center text-slate-400 cursor-pointer mt-4"
        >
          Create new account
        </p>

      </form>
    </div>
  );
}
