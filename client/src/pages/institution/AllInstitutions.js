// src/pages/AllInstitutions.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AllInstitutions() {
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
  api.get("/api/Institution/AllInstitutions")
    .then(res => {
      console.log(res.data); // Check the structure
      setInstitutions(Array.isArray(res.data) ? res.data : res.data.data || []);
    })
    .catch(() => console.log("Failed to fetch subjects"));
}, []);
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">All Institutions</h2>
      <ul className="space-y-2">
        {institutions.map((inst) => (
          <li key={inst.institutionID} className="border p-2 rounded">
            <strong>{inst.institutionName}</strong>
            <br />
            <small>{inst.institutionCode}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}