// pages/LogFundRequest.jsx
import { useState } from "react";
import api from "../../services/api";

export default function LogFundRequest() {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/Wallet/LogFundRequest", { amount: Number(amount) });
      setMessage("Fund request logged successfully.");
    } catch (err) {
      setMessage("Failed to log fund request.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Log Fund Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
          Submit Request
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}