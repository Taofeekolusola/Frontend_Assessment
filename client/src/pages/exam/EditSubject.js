// src/pages/EditSubject.jsx
import { useState } from "react";
import api from "../../services/api";

export default function EditSubject() {
  const [form, setForm] = useState({
    subjectName: "",
    subjectCode: "",
    subjectID: 0,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/api/Subject/EditSubject", form);
      setMessage("Subject updated successfully.");
    } catch {
      setMessage("Failed to update subject.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Subject</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="subjectID"
          value={form.subjectID}
          onChange={handleChange}
          placeholder="Subject ID"
          className="w-full border p-2 rounded"
        />
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
        <button className="w-full bg-blue-600 text-white p-2 rounded">Update</button>
      </form>
    </div>
  );
}