// pages/CreateScheme.jsx
import { useState } from "react";
import api from "../../services/api";

export default function CreateScheme() {
  const [formData, setFormData] = useState({
    schemeRoleID: 0,
    schemeCode: 0,
    schemeName: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/WalletScheme/CreateScheme", formData);
      setMessage("Scheme created successfully.");
    } catch {
      setMessage("Failed to create scheme.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Wallet Scheme</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Scheme Role ID"
          value={formData.schemeRoleID}
          onChange={(e) => setFormData({ ...formData, schemeRoleID: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Scheme Code"
          value={formData.schemeCode}
          onChange={(e) => setFormData({ ...formData, schemeCode: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Scheme Name"
          value={formData.schemeName}
          onChange={(e) => setFormData({ ...formData, schemeName: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded">
          Create
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}