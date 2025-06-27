// pages/AddSubscription.jsx
import { useState } from "react";
import api from "../../services/api"; // Ensure api handles auth token as discussed

export default function AddSubscription() {
  const [formData, setFormData] = useState({
    subscriptionDescription: "",
    subDuration: 0,
    subAmount: 0,
    subscriptionName: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "subDuration" || name === "subAmount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/Subscription/AddSubscription", formData);
      setSuccess(true);
      setError("");
    } catch (err) {
      setSuccess(false);
      setError("Failed to add subscription.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Subscription</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="subscriptionName"
          placeholder="Subscription Name"
          value={formData.subscriptionName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="subscriptionDescription"
          placeholder="Description"
          value={formData.subscriptionDescription}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="subDuration"
          placeholder="Duration (days)"
          value={formData.subDuration}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="subAmount"
          placeholder="Amount"
          value={formData.subAmount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
          Add Subscription
        </button>
      </form>

      {success && <p className="text-green-600 mt-4">Subscription added successfully!</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}