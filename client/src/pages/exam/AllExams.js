import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function AllExams() {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
  api.get("/api/Subject/AllSubject")
    .then(res => {
      console.log(res.data); // Check the structure
      setExams(Array.isArray(res.data) ? res.data : res.data.data || []);
    })
    .catch(() => console.log("Failed to fetch subjects"));
}, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Exams</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {exams.map((exam) => (
          <li key={exam.examID} className="border p-4 rounded bg-white shadow">
            <h3 className="text-lg font-semibold">{exam.examTitle}</h3>
            <p>{exam.examDescription}</p>
            <p>Date: {exam.examDate}</p>
            <Link to={`/exam-details/${exam.examID}`} className="text-blue-500">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}