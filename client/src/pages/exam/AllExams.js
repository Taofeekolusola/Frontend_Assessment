import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function AllExams() {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/Exam/AllExams")
      .then((res) => {
        const fetchedExams = res.data?.data || [];

        setExams(fetchedExams);
        if (fetchedExams.length === 0) {
          setError("No exams available at the moment.");
        }
      })
      .catch(() => {
        setError("Failed to fetch exams. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Exams</h2>

      {loading && <p>Loading exams...</p>}
      {error && !loading && <p className="text-red-500">{error}</p>}

      {!loading && exams.length > 0 && (
        <ul className="space-y-4">
          {exams.map((exam) => (
            <li key={exam.examID} className="border p-4 rounded bg-white shadow">
              <h3 className="text-lg font-semibold">{exam.examTitle}</h3>
              <p>{exam.examDescription}</p>
              <p className="text-sm text-gray-600">Date: {exam.examDate}</p>
              <Link
                to={`/dashboard/exam-details/${exam.examID}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}