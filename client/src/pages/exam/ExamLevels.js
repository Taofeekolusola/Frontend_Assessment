// src/pages/ExamLevels.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ExamLevels() {
  const [levels, setLevels] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
  api.get("/api/Subject/AllSubject")
    .then(res => {
      console.log(res.data); // Check the structure
      setLevels(Array.isArray(res.data) ? res.data : res.data.data || []);
    })
    .catch(() => console.log("Failed to fetch subjects"));
}, []);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Exam Levels</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {levels.map((level, i) => (
          <li key={i} className="p-2 border rounded">
            <strong>{level.subjectName}</strong> ({level.subjectCode})
          </li>
          ))}
        </ul>
    </div>
  );
}