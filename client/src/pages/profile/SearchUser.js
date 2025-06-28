import { useState } from "react";
import api from "../../services/api";

export default function SearchUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]);

    const queryParams = new URLSearchParams();
    if (name.trim()) queryParams.append("name", name.trim());
    if (email.trim()) queryParams.append("email", email.trim());

    try {
      const res = await api.get(`/api/User/Search?${queryParams.toString()}`);
      console.log("🔍 Raw API response:", res.data);
      setResults(res.data?.data || []); // adjust based on backend response
    } catch (err) {
      console.error(err);
      setError("Failed to search users.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search User</h2>

      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {results.map((user) => (
          <li key={user.id} className="p-3 border rounded bg-gray-100">
            <p>
              {user.firstname} {user.lastname} – {user.emailaddress}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}