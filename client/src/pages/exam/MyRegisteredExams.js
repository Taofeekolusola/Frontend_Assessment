import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MyRegisteredExams() {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/Exam/MyRegisteredExams")
      .then((res) => setExams(res.data))
      .catch(() => setError("Failed to load registered exams"));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Registered Exams</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {exams.map((exam) => (
          <li key={exam.examID} className="border p-4 rounded bg-white shadow">
            <h3 className="text-lg font-semibold">{exam.examTitle}</h3>
            <p>{exam.examDescription}</p>
            <p>Date: {exam.examDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}