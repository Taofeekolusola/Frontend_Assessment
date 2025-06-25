import { useState } from "react";
import api from "../../services/api";

export default function ChangeUserStatus() {
  const [formData, setFormData] = useState({
    userEmail: "",
    isEnabled: true
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/api/User/ChangeUserStatus", formData);
      setMessage("User status updated successfully.");
    } catch {
      setError("Failed to update user status.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Change User Status</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="userEmail"
          placeholder="User Email"
          value={formData.userEmail}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isEnabled"
            checked={formData.isEnabled}
            onChange={handleChange}
          />
          <span>Enable Account</span>
        </label>
        <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600">
          Update Status
        </button>
      </form>
    </div>
  );
}