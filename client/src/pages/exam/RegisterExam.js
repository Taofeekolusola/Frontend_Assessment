import React, { useState } from "react";
import api from "../../services/api";

export default function RegisterExam() {
  const [examID, setExamID] = useState("");

  const handleRegister = () => {
    api.post("/api/Exam/RegisterforExam", { examID: parseInt(examID) })
      .then(() => alert("Registered successfully"))
      .catch(() => alert("Registration failed"));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register for Exam</h2>
      <input
        type="number"
        placeholder="Enter Exam ID"
        value={examID}
        onChange={(e) => setExamID(e.target.value)}
        className="w-full p-2 border mb-4"
      />
      <button
        onClick={handleRegister}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </div>
  );
}