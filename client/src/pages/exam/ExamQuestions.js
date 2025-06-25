// src/pages/ExamQuestions.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function ExamQuestions() {
  const { examid } = useParams();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/api/Question/ExamQuestions/${examid}`)
      .then(res => setQuestions(res.data))
      .catch(() => setError("Failed to load exam questions"));
  }, [examid]);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Questions for Exam #{examid}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {questions.map((q, i) => (
          <li key={q.questionID} className="border p-4 rounded">
            <p className="font-medium">{i + 1}. {q.questionText}</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              {q.options?.map((opt, idx) => (
                <li key={idx}>{opt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}