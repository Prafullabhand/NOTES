import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminUpload() {
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const PATTERN = "it-2019"; // locked academic pattern

  const upload = async () => {
    if (!title || !year || !semester || !subject || !file)
      return alert("All fields required");

    if (year < 1 || year > 4)
      return alert("Year must be between 1 to 4");

    if (semester < 1 || semester > 8)
      return alert("Semester must be between 1 to 8");

    const token = localStorage.getItem("token");
    if (!token) return alert("Login again");

    try {
      setLoading(true);

      const form = new FormData();
      form.append("title", title.trim());
      form.append("pattern", PATTERN);
      form.append("year", year);
      form.append("semester", semester);
      form.append("subject", subject.trim());
      form.append("file", file);

      await axios.post(
        "http://localhost:5000/api/admin/upload",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Note uploaded successfully");

      // 🔁 Return to proper academic Year selector
      nav(`/notes/${PATTERN}/${year}`);

    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <div className="bg-[#020617] border border-slate-800 p-10 rounded-xl w-96 text-white space-y-3">
        <h2 className="text-2xl mb-4 font-bold text-center">Admin Upload</h2>

        <input
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
          className="w-full p-3 bg-black rounded"
        />

        <input
          type="number"
          min="1"
          max="4"
          placeholder="Year (1–4)"
          onChange={e => setYear(e.target.value)}
          className="w-full p-3 bg-black rounded"
        />

        <input
          type="number"
          min="1"
          max="8"
          placeholder="Semester (1–8)"
          onChange={e => setSemester(e.target.value)}
          className="w-full p-3 bg-black rounded"
        />

        <input
          placeholder="Subject (eg: DBMS, DSA, CN)"
          onChange={e => setSubject(e.target.value)}
          className="w-full p-3 bg-black rounded"
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={e => setFile(e.target.files[0])}
          className="mt-2"
        />

        <button
          disabled={loading}
          onClick={upload}
          className="w-full bg-emerald-600 hover:bg-emerald-500 p-3 rounded font-bold disabled:opacity-40"
        >
          {loading ? "Uploading..." : "Upload Note"}
        </button>
      </div>
    </div>
  );
}
