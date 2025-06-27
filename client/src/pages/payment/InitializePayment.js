// pages/InitializePayment.jsx
import { useState } from "react";
import api from "../../services/api";

export default function InitializePayment() {
  const [formData, setFormData] = useState({ amount: 0, subscriptionId: 0 });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/Payment/Initialize", formData);
      setMessage("Payment initialized.");
    } catch {
      setMessage("Initialization failed.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Initialize Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Subscription ID"
          value={formData.subscriptionId}
          onChange={(e) => setFormData({ ...formData, subscriptionId: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
        <button className="bg-blue-600 text-white w-full p-2 rounded" type="submit">
          Initialize
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}