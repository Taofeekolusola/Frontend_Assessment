import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MyRegisteredExams() {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/Subject/AllSubject")
      .then(res => {
        const data = res?.data?.data || [];
        setSubjects(data);
        console.log("Subjects fetched:", data); // Debug log
        if (!Array.isArray(data) || data.length === 0) {
          setError("No subjects found.");
        }
      })
      .catch(() => setError("Failed to fetch subjects."));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Registered Subjects</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {subjects.map((subject) => (
          <li key={subject.subjectID} className="border p-4 rounded bg-white shadow">
            <h3 className="text-lg font-semibold">{subject.subjectName}</h3>
            <p><strong>Code:</strong> {subject.subjectCode}</p>
            <p><strong>Date Created:</strong> {new Date(subject.createDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}