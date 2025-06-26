import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaUser, FaSignOutAlt, FaWallet, FaClipboardList, FaUniversity, FaUsers, FaBook, FaCheckCircle } from "react-icons/fa";
import { BsCreditCard, BsCalendarEvent, BsPlusCircle } from "react-icons/bs";

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
      <aside className={`bg-blue-900 text-white w-full md:w-64 p-4 md:block ${sidebarOpen ? "block" : "hidden"}`}>
        <nav className="space-y-3 text-sm">

          {/* General */}
          <Link to="/dashboard" className="block hover:text-gray-300">🏠 Dashboard</Link>

          {/* Exams */}
          <div className="mt-4 font-semibold text-blue-200">📝 Exams</div>
          <Link to="/dashboard/exams" className="block hover:text-gray-300">All Exams</Link>
          <Link to="/dashboard/my-registered-exams" className="block hover:text-gray-300">My Registered Exams</Link>
          <Link to="/dashboard/exam-by-subject" className="block hover:text-gray-300">Exam by Subject</Link>
          <Link to="/dashboard/exam-levels" className="block hover:text-gray-300">Exam Levels</Link>
          <Link to="/dashboard/start-exam" className="block hover:text-gray-300">Start Exam</Link>

          {/* Subjects */}
          <div className="mt-4 font-semibold text-blue-200">📚 Subjects</div>
          <Link to="/dashboard/subjects" className="block hover:text-gray-300">All Subjects</Link>
          <Link to="/dashboard/my-subjects" className="block hover:text-gray-300">My Subjects</Link>

          {/* Institutions */}
          <div className="mt-4 font-semibold text-blue-200">🏫 Institutions</div>
          <Link to="/dashboard/institutions" className="block hover:text-gray-300">All Institutions</Link>

          {/* Wallet */}
          <div className="mt-4 font-semibold text-blue-200">💳 Wallet</div>
          <Link to="/dashboard/my-wallet" className="block hover:text-gray-300">My Wallet</Link>
          <Link to="/dashboard/request-card" className="block hover:text-gray-300">Request Card</Link>
          <Link to="/dashboard/my-card-requests" className="block hover:text-gray-300">My Card Requests</Link>
          <Link to="/dashboard/verify-card" className="block hover:text-gray-300">Verify Card</Link>

          {/* Subscriptions */}
          <div className="mt-4 font-semibold text-blue-200">📦 Subscriptions</div>
          <Link to="/dashboard/subscriptions" className="block hover:text-gray-300">All Subscriptions</Link>
          <Link to="/dashboard/my-subscriptions" className="block hover:text-gray-300">My Subscriptions</Link>
          <Link to="/dashboard/subscribe-plan" className="block hover:text-gray-300">Subscribe to Plan</Link>
          <Link to="/dashboard/expire-subscriptions" className="block hover:text-gray-300">Expired Subscriptions</Link>

          {/* Admin Section */}
          {user?.role === 1 && (
            <>
              <hr className="my-4 border-gray-500" />
              <div className="font-semibold text-blue-200">🛠️ Admin Tools</div>
              <Link to="/dashboard/users" className="block hover:text-gray-300">Manage Users</Link>
              <Link to="/dashboard/search-user" className="block hover:text-gray-300">Search Users</Link>
              <Link to="/dashboard/change-user-status" className="block hover:text-gray-300">Change User Status</Link>
              <Link to="/dashboard/roles" className="block hover:text-gray-300">Manage Roles</Link>
              <Link to="/dashboard/create-exam" className="block hover:text-gray-300">Create Exam</Link>
              <Link to="/dashboard/create-subject" className="block hover:text-gray-300">Create Subject</Link>
              <Link to="/dashboard/load-fund" className="block hover:text-gray-300">Load Fund Request</Link>
              <Link to="/dashboard/card-denominations" className="block hover:text-gray-300">Card Denominations</Link>
            </>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 px-4 py-2 rounded text-white w-full flex items-center justify-center gap-2 hover:bg-red-700 transition"
          >
            <FaSignOutAlt />
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