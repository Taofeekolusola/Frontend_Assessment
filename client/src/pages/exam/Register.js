import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    emailaddress: "",
    phonenumber: "",
    role: "", // will be parsed to number
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
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err?.response?.data || err.message);
      setError(err?.response?.data?.message || "Registration failed. Please check your input.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="middlename" placeholder="Middle Name" onChange={handleChange} className="w-full p-2 border rounded" />

        <input type="email" name="emailaddress" placeholder="Email Address" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="phonenumber" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded" required />

        <select name="role" onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Role</option>
          <option value={32}>Participant</option>
          <option value={42}>Exams</option>
          <option value={52}>Examiner</option>
          <option value={62}>Vendor</option>
          <option value={99}>Administrator</option>
        </select>

        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" required />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
}