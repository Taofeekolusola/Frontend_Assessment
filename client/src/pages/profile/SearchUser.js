import { useState } from "react";
import api from "../../services/api";

export default function SearchUser() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.get(`/api/User/Search?query=${query}`);
      setResults(res.data);
    } catch {
      setError("Failed to search users.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search User</h2>
      <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter name or email"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
          Search
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {results.map((user) => (
          <li key={user.id} className="p-3 border rounded bg-gray-100">
            <p>{user.firstname} {user.lastname} – {user.emailaddress}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}