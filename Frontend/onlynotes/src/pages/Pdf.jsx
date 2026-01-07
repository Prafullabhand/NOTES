import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PDF() {
  const { pattern, year, semester, subject } = useParams();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/notes/${pattern}/${year}/${semester}/${subject}`)
      .then(res => {
        // backend returns full note objects
        setNotes(res.data || []);
      })
      .catch(err => console.log("PDF LOAD ERROR", err));
  }, [pattern, year, semester, subject]);

  return (
    <div className="min-h-screen bg-[#020617] p-12 text-white">
      <h1 className="text-3xl mb-6">Subject: {subject}</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {notes.length === 0 && (
          <p className="text-slate-400">No PDFs uploaded for this subject yet.</p>
        )}

        {notes.map(n => (
          <div key={n._id} className="bg-black p-6 rounded-xl border border-slate-800">
            <h2 className="text-lg mb-2">{n.title}</h2>
            <a
  href={`https://notes-backend-50pr.onrender.com/api/notes/download/pdf?url=${encodeURIComponent(n.fileUrl)}&title=${encodeURIComponent(n.title)}`}
  className="bg-emerald-600 px-4 py-2 rounded inline-block mt-2"
>
  Download PDF
</a>


          </div>
        ))}
      </div>
    </div>
  );
}
