// src/pages/ExamBySubject.jsx
import { useState } from "react";
import api from "../../services/api";

export default function ExamBySubject() {
  const [subjectID, setSubjectID] = useState("");
  const [exams, setExams] = useState([]);
  const [error, setError] = useState("");

  const handleFetch = () => {
    api.get(`/api/Exam/ExamBySubject/${subjectID}`)
      .then(res => setExams(res.data))
      .catch(() => setError("Failed to fetch exams for subject."));
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Get Exams by Subject</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={subjectID}
          onChange={(e) => setSubjectID(e.target.value)}
          placeholder="Subject ID"
          className="border p-2 flex-grow rounded"
        />
        <button onClick={handleFetch} className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
          Fetch
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-3">
        {exams.map((exam) => (
          <li key={exam.examID} className="border p-3 rounded bg-gray-50">
            <strong>{exam.examTitle}</strong> - {exam.examDate}
          </li>
        ))}
      </ul>
    </div>
  );
}