import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const SidebarLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Top Bar for Mobile */}
      <header className="md:hidden bg-blue-900 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">QuizApp</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white text-2xl">
          <FaBars />
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`bg-blue-900 text-white w-full md:w-64 p-4 md:block ${sidebarOpen ? 'block' : 'hidden'}`}>
        <nav className="space-y-3">
          <Link to="/dashboard" className="block hover:text-gray-300">Dashboard</Link>
          <Link to="/dashboard/exams" className="block hover:text-gray-300">Exams</Link>
          <Link to="/dashboard/subjects" className="block hover:text-gray-300">Subjects</Link>
          <Link to="/dashboard/institutions" className="block hover:text-gray-300">Institutions</Link>
          {user?.role === 1 && (
            <>
              <Link to="/dashboard/users" className="block hover:text-gray-300">Users</Link>
              <Link to="/dashboard/create-exam" className="block hover:text-gray-300">Create Exam</Link>
              <Link to="/dashboard/create-subject" className="block hover:text-gray-300">Create Subject</Link>
            </>
          )}

          <button onClick={handleLogout} className="mt-4 bg-red-600 px-4 py-2 rounded text-white w-full">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;