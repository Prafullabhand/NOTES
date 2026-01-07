import { useParams, useNavigate } from "react-router-dom";

export default function Year() {
  const { pattern, year } = useParams();
  const nav = useNavigate();

  // Academic semester mapping
  const map = {
    1: [1, 2],
    2: [3, 4],
    3: [5, 6],
    4: [7, 8]
  };

  const semesters = map[year] || [];

  return (
    <div className="min-h-screen bg-[#020617] p-12 text-white">
      <h1 className="text-3xl mb-6">Select Semester – Year {year}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {semesters.map(sem => (
          <div
            key={sem}
            onClick={() => nav(`/notes/${pattern}/${year}/${sem}`)}
            className="bg-black p-6 rounded-xl cursor-pointer border border-slate-800 hover:border-emerald-500"
          >
            Semester {sem}
          </div>
        ))}
      </div>
    </div>
  );
}
