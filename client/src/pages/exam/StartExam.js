// src/pages/StartExam.jsx
import { useState } from "react";
import api from "../../services/api";

export default function StartExam() {
  const [examID, setExamID] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); setError("");
    try {
      await api.put("/api/Exam/StartExam", { examID: parseInt(examID) });
      setMessage("Exam started successfully.");
    } catch {
      setError("Failed to start exam.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Start Exam</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="examID"
          value={examID}
          onChange={(e) => setExamID(e.target.value)}
          placeholder="Enter Exam ID"
          className="w-full p-2 border rounded"
          required
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Start</button>
      </form>
    </div>
  );
}