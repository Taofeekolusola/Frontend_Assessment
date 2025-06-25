import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await api.post("/api/Account/Authenticate", formData);
    const token = response.data.token;
    const user = response.data.details; // ✅ This is the actual user data

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // ✅ Store correctly

    navigate("/dashboard"); // ✅ Go directly to dashboard
  } catch (err) {
    setError("Invalid email or password.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500">Please login to continue</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            name="emailAddress"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-300"
        >
          Login
        </button>

        <p className="text-sm text-center mt-2 text-gray-600">
          <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
        </p>
      </form>
    </div>
  );
}