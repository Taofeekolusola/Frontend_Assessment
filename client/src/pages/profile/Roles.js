import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Roles() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    api.get("/api/Role/Roles")
      .then(res => setRoles(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Available Roles</h2>
      <ul className="space-y-2">
        {roles.map((role) => (
          <li key={role.id} className="p-3 border rounded bg-gray-50">
            {role.name}
          </li>
        ))}
      </ul>
    </div>
  );
}