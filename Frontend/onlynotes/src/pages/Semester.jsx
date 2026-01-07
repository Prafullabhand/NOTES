import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Semester() {
  const { pattern, year, semester } = useParams();
  const nav = useNavigate();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axios.get(`https://notes-backend-50pr.onrender.com/api/notes/${pattern}/${year}/${semester}`)
      .then(res => setSubjects(res.data));
  }, [pattern, year, semester]);

  return (
    <div className="min-h-screen bg-[#020617] p-12 text-white">
      <h1 className="text-3xl mb-6">Select Subject – Sem {semester}</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {subjects.map(s => (
          <div key={s}
            onClick={() => nav(`/notes/${pattern}/${year}/${semester}/${s}`)}
            className="bg-black p-6 rounded-xl cursor-pointer border border-slate-800 hover:border-emerald-500">
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
