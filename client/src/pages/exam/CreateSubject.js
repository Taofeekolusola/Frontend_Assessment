// src/pages/CreateSubject.jsx
import { useState } from "react";
import api from "../../services/api";

export default function CreateSubject() {
  const [form, setForm] = useState({
    subjectName: "",
    subjectCode: "",
    instutitionID: 0,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/Subject/CreateSubject", form);
      setMessage("Subject created successfully.");
    } catch {
      setMessage("Failed to create subject.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Subject</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="subjectName"
          value={form.subjectName}
          onChange={handleChange}
          placeholder="Subject Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="subjectCode"
          value={form.subjectCode}
          onChange={handleChange}
          placeholder="Subject Code"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="instutitionID"
          value={form.instutitionID}
          onChange={handleChange}
          placeholder="Institution ID"
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Create</button>
      </form>
    </div>
  );
}