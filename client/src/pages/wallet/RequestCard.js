// pages/RequestCardPage.jsx
import { useState } from "react";
import api from "../../services/api";

export default function RequestCard() {
  const [form, setForm] = useState({ cardDenomination: "", totalCard: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const denomination = parseInt(form.cardDenomination);
  const total = parseInt(form.totalCard);

  if (isNaN(denomination) || isNaN(total)) {
    setMessage("Please enter valid numeric values.");
    return;
  }

  const payload = {
    cardDenomination: denomination,
    totalCard: total,
  };

  console.log("Sending payload:", payload); // 👈 check values

  try {
    const res = await api.post("/api/CardRequest/RequestCard", payload);
    console.log(res.data);
    setMessage("✅ Card request submitted successfully.");
    setForm({ cardDenomination: "", totalCard: "" });
  } catch (err) {
  console.error("Error response:", err?.response?.data || err);
  setMessage("❌ " + (err?.response?.data?.message || "Failed to submit card request."));
}
};

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Request Card</h2>
      {message && <p className="mb-2 text-sm text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="cardDenomination" type="number" placeholder="Card Denomination" onChange={handleChange} className="border p-2 w-full" required />
        <input name="totalCard" type="number" placeholder="Total Cards" onChange={handleChange} className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}