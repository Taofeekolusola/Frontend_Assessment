import React, { useState } from "react";
import api from "../../services/api";

export default function CreateInstitution() {
  const [formData, setFormData] = useState({
    institutionName: "",
    institutionCode: "",
    institutionAddress: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/api/Institution/CreateInstitution", formData)
      .then(() => alert("Institution created successfully"))
      .catch(() => alert("Failed to create institution"));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Institution</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="institutionName" placeholder="Name" onChange={handleChange} className="w-full p-2 border" />
        <input name="institutionCode" placeholder="Code" onChange={handleChange} className="w-full p-2 border" />
        <input name="institutionAddress" placeholder="Address" onChange={handleChange} className="w-full p-2 border" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
}