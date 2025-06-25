// src/pages/SingleSubject.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function SingleSubject() {
  const { SubjectID } = useParams();
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    api.get(`/api/Subject/SingleSubject/${SubjectID}`)
      .then(res => setSubject(res.data))
      .catch(() => console.log("Failed to fetch subject"));
  }, [SubjectID]);

  if (!subject) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Subject Details</h2>
      <p><strong>Name:</strong> {subject.subjectName}</p>
      <p><strong>Code:</strong> {subject.subjectCode}</p>
      <p><strong>ID:</strong> {subject.subjectID}</p>
    </div>
  );
}