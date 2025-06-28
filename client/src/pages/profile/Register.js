import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    emailaddress: "",
    phonenumber: "",
    role: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/api/Account/Register", {
        ...formData,
        role: parseInt(formData.role)
      });
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/confirm-activation"), 2000);
    } catch (err) {
      console.error(err?.response?.data || err.message);
      setError(err?.response?.data?.message || "Registration failed. Please check your input.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">Create an Account</h2>
        <p className="text-sm text-center text-gray-500">Join our platform today</p>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={handleChange}
              className="pl-10 w-full py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              className="pl-10 w-full py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        <div className="relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            name="middlename"
            placeholder="Middle Name"
            onChange={handleChange}
            className="pl-10 w-full py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            name="emailaddress"
            placeholder="Email Address"
            onChange={handleChange}
            className="pl-10 w-full py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="relative">
          <FaPhone className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            name="phonenumber"
            placeholder="Phone Number"
            onChange={handleChange}
            className="pl-10 w-full py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <select
          name="role"
          onChange={handleChange}
          className="w-full py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Role</option>
          <option value={32}>Participant</option>
          <option value={42}>Exams</option>
          <option value={52}>Examiner</option>
          <option value={62}>Vendor</option>
          <option value={99}>Administrator</option>
        </select>

        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="pl-10 w-full py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
        >
          Register
        </button>
        <p className="text-sm text-center mt-2 text-gray-600">
                Already have an account?
                  <Link to="/login" className="text-blue-600 hover:underline"> Sign in</Link>
                </p>
      </form>
    </div>
  );
}