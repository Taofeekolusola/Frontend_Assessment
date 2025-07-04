import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function VerifyPasswordCode() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailAddress: "",
    code: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/api/Account/VerifyPasswordCode", formData);
      setMessage("Code verified successfully. Redirecting to reset password...");
      setTimeout(() => navigate("/reset-password"), 2000);
    } catch (err) {
      setError("Invalid code or email address.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Verify Password Reset Code</h2>
        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="email"
          name="emailAddress"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="code"
          placeholder="Verification Code"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Verify Code
        </button>
      </form>
    </div>
  );
}