import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Subject() {
  const { pattern, year, semester } = useParams();
  const nav = useNavigate();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axios
      .get(`https://notes-backend-50p.onrender.com/api/notes/${pattern}/${year}/${semester}`)
      .then(res => {
        // backend returns simple subject strings
        const clean = [...new Set(res.data.map(s => s.trim()))];
        setSubjects(clean);
      })
      .catch(err => console.log("SUBJECT LOAD ERROR", err));
  }, [pattern, year, semester]);

  return (
    <div className="min-h-screen bg-[#020617] p-12 text-white">
      <h1 className="text-3xl mb-6">Select Subject</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {subjects.map(sub => (
          <div
            key={sub}
            onClick={() => nav(`/notes/${pattern}/${year}/${semester}/${sub}`)}
            className="bg-black p-6 rounded-xl cursor-pointer border border-slate-800 hover:border-emerald-500"
          >
            {sub}
          </div>
        ))}
      </div>
    </div>
  );
}
