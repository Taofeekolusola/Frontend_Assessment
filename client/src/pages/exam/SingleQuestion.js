// src/pages/SingleQuestion.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function SingleQuestion() {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/api/Question/ExamQuestion/${questionid}`)
      .then(res => setQuestion(res.data))
      .catch(() => setError("Failed to load question"));
  }, [questionid]);

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!question) return <p className="text-center mt-4">Loading question...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Question Details</h2>
      <p className="mb-2">{question.questionText}</p>
      <ul className="list-disc pl-6 space-y-1">
        {question.options?.map((opt, i) => (
          <li key={i}>{opt}</li>
        ))}
      </ul>
    </div>
  );
}