import React, { useState } from "react";
import api from "../../services/api";

export default function EditQuestion() {
  const [questionid, setQuestionid] = useState("");
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
    api.put(`/api/Question/EditQuestions/${questionid}`, {
      ...question,
      correctOption: parseInt(question.correctOption)
    })
      .then(() => alert("Question updated"))
      .catch(() => alert("Failed to update question"));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Question ID" value={questionid} onChange={(e) => setQuestionid(e.target.value)} className="w-full p-2 border" />
        <input name="questionText" placeholder="Question Text" onChange={handleChange} className="w-full p-2 border" />
        <input name="option1" placeholder="Option 1" onChange={handleChange} className="w-full p-2 border" />
        <input name="option2" placeholder="Option 2" onChange={handleChange} className="w-full p-2 border" />
        <input name="option3" placeholder="Option 3" onChange={handleChange} className="w-full p-2 border" />
        <input name="option4" placeholder="Option 4" onChange={handleChange} className="w-full p-2 border" />
        <input name="option5" placeholder="Option 5" onChange={handleChange} className="w-full p-2 border" />
        <input type="number" name="correctOption" placeholder="Correct Option (1-5)" onChange={handleChange} className="w-full p-2 border" />
        <input name="image" placeholder="Image URL (optional)" onChange={handleChange} className="w-full p-2 border" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Update Question</button>
      </form>
    </div>
  );
}