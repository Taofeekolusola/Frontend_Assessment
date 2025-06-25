// src/pages/EditExam.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function EditExam() {
  const { examid } = useParams();
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/api/Exam/ExamDetails/${examid}`)
      .then(res => setForm(res.data))
      .catch(() => setError("Failed to load exam details."));
  }, [examid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/Exam/EditExam/${examid}`, form);
      setMessage("Exam updated successfully.");
    } catch {
      setError("Failed to update exam.");
    }
  };

  if (!form) return <p className="text-center mt-4">Loading exam...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Exam</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ["examTitle", "Exam Title"],
          ["examDescription", "Description"],
          ["examDuration", "Duration (minutes)"],
          ["examLevel", "Level"],
          ["examFee", "Fee"],
          ["examDate", "Exam Date"],
          ["examStartTime", "Start Time"],
          ["examSubject", "Subject ID"],
          ["numberofQuestions", "Number of Questions"]
        ].map(([name, label]) => (
          <input
            key={name}
            type={name.includes("Date") ? "date" : "text"}
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={label}
            className="w-full border p-2 rounded"
            required
          />
        ))}
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Update Exam</button>
      </form>
    </div>
  );
}