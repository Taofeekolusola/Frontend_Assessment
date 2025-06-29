// src/pages/CreateSubject.jsx
import { useState } from "react";
import api from "../../services/api";

export default function CreateSubject() {
  const [form, setForm] = useState({
    subjectName: "",
    subjectCode: "",
    institutionID: 0, // ✅ fixed spelling
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "institutionID" ? Number(value) : value, // Ensure numeric input
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const payload = {
      subjectName: form.subjectName.trim(),
      subjectCode: form.subjectCode.trim(),
      institutionID: parseInt(form.institutionID),
    };

    console.log("📦 Sending payload:", payload);

    try {
      const res = await api.post("/api/Subject/CreateSubject", payload);
      setMessage("✅ Subject created successfully.");
      setForm({ subjectName: "", subjectCode: "", institutionID: 0 });
    } catch (err) {
      const validationErrors = err.response?.data?.errors;
      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0]?.[0];
        setError(`❌ Validation error: ${firstError}`);
      } else {
        setError("❌ Failed to create subject.");
      }
      console.error("❌ Error from server:", err.response?.data);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Subject</h2>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="subjectName"
          value={form.subjectName}
          onChange={handleChange}
          placeholder="Subject Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="subjectCode"
          value={form.subjectCode}
          onChange={handleChange}
          placeholder="Subject Code"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="institutionID"
          value={form.institutionID}
          onChange={handleChange}
          placeholder="Institution ID"
          className="w-full border p-2 rounded"
          required
          min={1}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}