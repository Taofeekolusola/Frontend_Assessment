import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/User/Users")
      .then(res => setUsers(res.data))
      .catch(() => setError("Could not fetch users."));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-3">
        {users.map(user => (
          <li key={user.id} className="border p-3 rounded bg-gray-50">
            <p><strong>{user.firstname} {user.lastname}</strong></p>
            <p>{user.emailaddress}</p>
            <Link to={`/user-profile/${user.id}`} className="text-blue-500 text-sm hover:underline">View Profile</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}