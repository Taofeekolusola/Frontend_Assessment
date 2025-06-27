import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function SubjectSummary() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    api
      .get("/api/Subject/MySubjectCount")
      .then((res) => setCount(Array.isArray(res.data)))
      .catch((err) => console.error("Failed to fetch subject count"));
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">My Subject Count</h2>
      <p className="text-lg">📚 Total Subjects: <strong>{count || 0}</strong></p>
    </div>
  );
}