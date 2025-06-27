import React, { useState } from "react";
import api from "../../services/api";

export default function CreateQuestion() {
  const [examID, setExamID] = useState("");
  const [question, setQuestion] = useState({
    questionText: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
    correctOption: 1,
    image: ""
  });

  const handleChange = (e) =>
    setQuestion({ ...question, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/api/Question/CreateQuestion", {
      examID: parseInt(examID),
      questions: [{ ...question, correctOption: parseInt(question.correctOption) }]
    })
      .then(() => alert("Question created"))
      .catch(() => alert("Failed to create question"));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" name="examID" placeholder="Exam ID" value={examID} onChange={(e) => setExamID(e.target.value)} className="w-full p-2 border" />
        <input name="questionText" placeholder="Question Text" onChange={handleChange} className="w-full p-2 border" />
        <input name="option1" placeholder="Option 1" onChange={handleChange} className="w-full p-2 border" />
        <input name="option2" placeholder="Option 2" onChange={handleChange} className="w-full p-2 border" />
        <input name="option3" placeholder="Option 3" onChange={handleChange} className="w-full p-2 border" />
        <input name="option4" placeholder="Option 4" onChange={handleChange} className="w-full p-2 border" />
        <input name="option5" placeholder="Option 5" onChange={handleChange} className="w-full p-2 border" />
        <input type="number" name="correctOption" placeholder="Correct Option (1-5)" onChange={handleChange} className="w-full p-2 border" />
        <input name="image" placeholder="Image URL (optional)" onChange={handleChange} className="w-full p-2 border" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create Question</button>
      </form>
    </div>
  );
}