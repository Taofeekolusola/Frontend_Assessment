// src/pages/MySubjects.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MySubjects() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
  api.get("/api/Subject/AllSubject")
    .then(res => {
      console.log(res.data); // Check the structure
      setSubjects(Array.isArray(res.data) ? res.data : res.data.data || []);
    })
    .catch(() => console.log("Failed to fetch subjects"));
}, []);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">My Subjects</h2>
      <ul className="space-y-2">
        {subjects.map((s) => (
          <li key={s.subjectID} className="border p-2 rounded">
            <strong>{s.subjectName}</strong> — {s.subjectCode}
          </li>
        ))}
      </ul>
    </div>
  );
}