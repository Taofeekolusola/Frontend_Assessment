// src/pages/SubmitAnswers.jsx
import { useState } from "react";
import api from "../../services/api";

export default function SubmitAnswers() {
  const [examID, setExamID] = useState("");
  const [answers, setAnswers] = useState([{ questionID: "", option: 0 }]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAnswerChange = (index, field, value) => {
    const newAnswers = [...answers];
    newAnswers[index][field] = value;
    setAnswers(newAnswers);
  };

  const addAnswer = () => {
    setAnswers([...answers, { questionID: "", option: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/Exam/SubmitAnswers", {
        examID: parseInt(examID),
        answers,
      });
      setMessage("Answers submitted successfully.");
    } catch {
      setError("Failed to submit answers.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Submit Exam Answers</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={examID}
          onChange={(e) => setExamID(e.target.value)}
          placeholder="Exam ID"
          className="w-full p-2 border rounded"
          required
        />
        {answers.map((ans, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              type="text"
              value={ans.questionID}
              onChange={(e) => handleAnswerChange(idx, "questionID", e.target.value)}
              placeholder="Question ID"
              className="w-3/4 border p-2 rounded"
              required
            />
            <input
              type="number"
              value={ans.option}
              onChange={(e) => handleAnswerChange(idx, "option", parseInt(e.target.value))}
              placeholder="Option"
              className="w-1/4 border p-2 rounded"
              required
            />
          </div>
        ))}
        <button type="button" onClick={addAnswer} className="text-sm text-blue-600">
          + Add another answer
        </button>
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit Answers</button>
      </form>
    </div>
  );
}