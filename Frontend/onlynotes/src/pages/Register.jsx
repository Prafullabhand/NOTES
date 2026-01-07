import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post("https://notes-backend-50pr.onrender.com/api/auth/register", {
        name,
        email,
        password
      });

      alert("Account created successfully");
      location = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <form autoComplete="off" className="w-full max-w-md bg-[#020617] border border-slate-800 rounded-2xl shadow-2xl p-10 space-y-5 text-white">

        <h1 className="text-3xl font-bold text-center">Create Account</h1>

        <input
          type="text"
          name="new-name"
          autoComplete="off"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 rounded-xl bg-black border border-slate-700"
        />

        <input
          type="text"
          name="new-email"
          autoComplete="off"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-black border border-slate-700"
        />

        <input
          type="password"
          name="new-password"
          autoComplete="new-password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-black border border-slate-700"
        />

        <button
          type="button"
          onClick={register}
          className="w-full bg-emerald-600 hover:bg-emerald-500 p-3 rounded-xl font-semibold text-black"
        >
          Sign Up
        </button>

        <p onClick={() => location = "/"} className="text-center text-slate-400 cursor-pointer">
          Already have an account? Login
        </p>

      </form>
    </div>
  );
}
