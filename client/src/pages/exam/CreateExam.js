// src/pages/CreateExam.jsx
import { useState } from "react";
import api from "../../services/api";

export default function CreateExam() {
  const [form, setForm] = useState({
    examTitle: "",
    examDescription: "",
    examDuration: 0,
    examLevel: 0,
    examFee: 0,
    examDate: "",
    examStartTime: "",
    examSubject: 0,
    numberofQuestions: 0,
    payAsYouGo: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/Exam/CreateExam", form);
      setMessage("Exam created successfully.");
    } catch {
      setError("Failed to create exam.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create Exam</h2>
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
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="payAsYouGo"
            checked={form.payAsYouGo}
            onChange={handleChange}
          />
          <span>Pay As You Go</span>
        </label>
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
}