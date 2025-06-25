import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/api/Account/ForgotPassword", { emailAddress });
      setMessage("Reset code sent to your email.");
      // Add a short delay before navigating
      setTimeout(() => navigate("/reset-password"), 2000);
    } catch (err) {
      setError("Failed to send reset code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Forgot Password</h2>
        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="email"
          name="emailAddress"
          placeholder="Email Address"
          onChange={(e) => setEmailAddress(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Send Reset Code
        </button>
      </form>
    </div>
  );
}