// pages/AddInstitution.jsx
import { useState } from "react";
import api from "../../services/api";

export default function AddInstitution() {
  const [formData, setFormData] = useState({
    institutionID: 0,
    registrationNumber: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/User/AddInstitution", formData);
      setMessage("Institution added successfully.");
    } catch {
      setMessage("Failed to add institution.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Institution</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" name="institutionID" value={formData.institutionID}
          onChange={(e) => setFormData({ ...formData, institutionID: Number(e.target.value) })}
          className="w-full p-2 border rounded" required placeholder="Institution ID" />
        <input type="text" name="registrationNumber" value={formData.registrationNumber}
          onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
          className="w-full p-2 border rounded" required placeholder="Registration Number" />
        <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded">Add</button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}