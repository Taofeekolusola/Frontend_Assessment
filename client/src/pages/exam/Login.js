import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

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
      localStorage.setItem("token", token);
      navigate("/"); // Redirect to dashboard or homepage
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>
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
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>

        <p className="text-sm text-center mt-2">
          <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a>
        </p>
      </form>
    </div>
  );
}