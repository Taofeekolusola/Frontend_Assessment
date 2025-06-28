// src/pages/SingleInstitution.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function SingleInstitution() {
  const { InstitutionID } = useParams();
  const [institution, setInstitution] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/api/Institution/SingleInstitution/${InstitutionID}`)
      .then(res => setInstitution(res.data.data))
      .catch(() => setError("Failed to fetch institution."));
  }, [InstitutionID]);

  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
  if (!institution) return <p className="text-center mt-6">Loading institution...</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Institution Details</h2>
      <p><strong>Name:</strong> {institution.institutionName}</p>
      <p><strong>Code:</strong> {institution.institutionCode}</p>
      <p><strong>ID:</strong> {institution.institutionID}</p>
    </div>
  );
}
