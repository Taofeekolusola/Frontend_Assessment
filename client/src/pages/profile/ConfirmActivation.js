import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";

export default function ConfirmActivation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailAddress: "",
    activationCode: ""
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
      await api.post("/api/Account/ConfirmActivationCode", formData);
      setMessage("Activation code confirmed. Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Invalid activation code or email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">Email Verification</h2>
        <p className="text-sm text-center text-gray-500">
          Enter your email and the activation code sent to your inbox
        </p>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            name="emailAddress"
            placeholder="Email Address"
            onChange={handleChange}
            className="pl-10 w-full py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="relative">
          <FaKey className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            name="activationCode"
            placeholder="Activation Code"
            onChange={handleChange}
            className="pl-10 w-full py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
        >
          Confirm Code
        </button>
      </form>
    </div>
  );
}