import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("https://notes-backend-50pr.onrender.com/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data.users));
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-12">
      <h1 className="text-3xl font-bold mb-6">📊 Platform Usage</h1>

      <div className="bg-black border border-slate-800 rounded-xl p-6">
        <p className="text-emerald-400 mb-4">
          Total Registered Students: {users.length}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {users.map(u => (
            <div key={u._id} className="bg-[#020617] p-4 rounded-lg border border-slate-800">
              <p className="font-semibold">{u.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
