import React, { useState } from "react";
import api from "../../services/api";

export default function EditInstitution() {
  const [formData, setFormData] = useState({
    institutionID: "",
    institutionName: "",
    institutionCode: "",
    institutionAddress: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/api/Institution/EditInstitution", {
      ...formData,
      institutionID: parseInt(formData.institutionID)
    })
      .then(() => alert("Institution updated"))
      .catch(() => alert("Update failed"));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Institution</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="institutionID" placeholder="ID" onChange={handleChange} className="w-full p-2 border" />
        <input name="institutionName" placeholder="Name" onChange={handleChange} className="w-full p-2 border" />
        <input name="institutionCode" placeholder="Code" onChange={handleChange} className="w-full p-2 border" />
        <input name="institutionAddress" placeholder="Address" onChange={handleChange} className="w-full p-2 border" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}