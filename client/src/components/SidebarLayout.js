// src/components/SidebarLayout.jsx
import { Outlet, Link, useNavigate } from "react-router-dom";

const SidebarLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">QuizApp</h2>
        <nav className="space-y-3">
          <Link to="/" className="block hover:text-gray-300">Dashboard</Link>
          <Link to="/exams" className="block hover:text-gray-300">Exams</Link>
          <Link to="/subjects" className="block hover:text-gray-300">Subjects</Link>
          <Link to="/institutions" className="block hover:text-gray-300">Institutions</Link>
          {user?.role === 1 && (
            <>
              <Link to="/users" className="block hover:text-gray-300">Users</Link>
              <Link to="/create-exam" className="block hover:text-gray-300">Create Exam</Link>
              <Link to="/create-subject" className="block hover:text-gray-300">Create Subject</Link>
            </>
          )}
          <button onClick={handleLogout} className="mt-4 bg-red-600 px-4 py-2 rounded text-white">
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;