// pages/ViewExamQuestion.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function ViewExamQuestion() {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    api.get(`/api/Question/ExamQuestion/${questionid}`)
      .then(res => setQuestion(res.data))
      .catch(() => setQuestion(null));
  }, [questionid]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Exam Question</h2>
      {question ? (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(question, null, 2)}</pre>
      ) : (
        <p>No question found.</p>
      )}
    </div>
  );
}