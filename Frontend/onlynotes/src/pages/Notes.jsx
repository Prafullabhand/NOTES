import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Notes() {
  const { pattern } = useParams();
  const nav = useNavigate();
  const [years, setYears] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/notes/${pattern}`)
      .then(res => setYears(res.data));
  }, [pattern]);

  return (
    <div className="min-h-screen bg-[#020617] p-12 text-white">
      <h1 className="text-3xl mb-6">Select Year</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {years.map(y => (
          <div
            key={y}
            onClick={() => nav(`/notes/${pattern}/${y}`)}
            className="bg-black p-6 rounded-xl cursor-pointer border border-slate-800 hover:border-emerald-500"
          >
            Year {y}
          </div>
        ))}
      </div>
    </div>
  );
}
