import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaBars, FaUser, FaSignOutAlt, FaFolderOpen,
  FaChalkboardTeacher, FaGraduationCap
} from "react-icons/fa";
import {
  BsChevronDown, BsChevronUp
} from "react-icons/bs";

const SidebarLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [openSection, setOpenSection] = useState({
    exams: true,
    subjects: true,
    institutions: true,
    wallet: true,
    subscriptions: true,
    admin: true,
  });

  const toggleSection = (section) =>
    setOpenSection({ ...openSection, [section]: !openSection[section] });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Top bar for small screens */}
      <header className="md:hidden bg-blue-900 text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          QUIZ APP
        </h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white text-2xl">
          <FaBars />
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`bg-blue-900 text-white w-full md:w-64 p-4 flex flex-col justify-between ${
          sidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        <div>
          {/* QUIZ APP heading on sidebar (hidden on mobile) */}
        <div className="mb-6 hidden md:block">
          <h1 className="text-2xl font-bold text-left">QUIZ APP</h1>
        </div>

          {/* Navigation */}
          <nav className="space-y-3 text-sm">
            <Link to="/dashboard" className="block hover:text-gray-300">🏠 Dashboard</Link>

            {/* Exams */}
            <div
              className="mt-4 font-semibold text-blue-200 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection("exams")}
            >
              📝 Exams {openSection.exams ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            {openSection.exams && (
              <>
                <Link to="/dashboard/exams" className="block hover:text-gray-300">All Exams</Link>
                <Link to="/dashboard/my-registered-exams" className="block hover:text-gray-300">My Registered Exams</Link>
                <Link to="/dashboard/exam-by-subject" className="block hover:text-gray-300">Exam by Subject</Link>
                <Link to="/dashboard/exam-levels" className="block hover:text-gray-300">Exam Levels</Link>
                <Link to="/dashboard/start-exam" className="block hover:text-gray-300">Start Exam</Link>
              </>
            )}

            {/* Subjects */}
            <div
              className="mt-4 font-semibold text-blue-200 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection("subjects")}
            >
              📚 Subjects {openSection.subjects ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            {openSection.subjects && (
              <>
                <Link to="/dashboard/subjects" className="block hover:text-gray-300">All Subjects</Link>
                <Link to="/dashboard/my-subjects" className="block hover:text-gray-300">My Subjects</Link>
              </>
            )}

            {/* Institutions */}
            <div
              className="mt-4 font-semibold text-blue-200 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection("institutions")}
            >
              🏫 Institutions {openSection.institutions ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            {openSection.institutions && (
              <Link to="/dashboard/institutions" className="block hover:text-gray-300">All Institutions</Link>
            )}

            {/* Wallet */}
            <div
              className="mt-4 font-semibold text-blue-200 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection("wallet")}
            >
              💳 Wallet {openSection.wallet ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            {openSection.wallet && (
              <>
                <Link to="/dashboard/my-wallet" className="block hover:text-gray-300">My Wallet</Link>
                <Link to="/dashboard/request-card" className="block hover:text-gray-300">Request Card</Link>
                <Link to="/dashboard/my-card-requests" className="block hover:text-gray-300">My Card Requests</Link>
                <Link to="/dashboard/verify-card" className="block hover:text-gray-300">Verify Card</Link>
              </>
            )}

            {/* Subscriptions */}
            <div
              className="mt-4 font-semibold text-blue-200 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection("subscriptions")}
            >
              📦 Subscriptions {openSection.subscriptions ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            {openSection.subscriptions && (
              <>
                <Link to="/dashboard/subscriptions" className="block hover:text-gray-300">All Subscriptions</Link>
                <Link to="/dashboard/my-subscriptions" className="block hover:text-gray-300">My Subscriptions</Link>
                <Link to="/dashboard/subscribe-plan" className="block hover:text-gray-300">Subscribe to Plan</Link>
                <Link to="/dashboard/expire-subscriptions" className="block hover:text-gray-300">Expired Subscriptions</Link>
              </>
            )}

            {/* Admin Section */}
            {user?.role === 1 && (
              <>
                <div
                  className="mt-4 font-semibold text-blue-200 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleSection("admin")}
                >
                  🛠️ Admin Tools {openSection.admin ? <BsChevronUp /> : <BsChevronDown />}
                </div>
                {openSection.admin && (
                  <>
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
              </>
            )}
          </nav>
        </div>

        {/* Bottom Section (busy & attractive) */}
        <div className="mt-6 border-t border-gray-500 pt-4 text-white">
          <div className="flex justify-around text-lg">
            <div title="Profile" className="hover:text-yellow-400 cursor-pointer">
              <FaUser />
            </div>
            <div title="Resources" className="hover:text-yellow-400 cursor-pointer">
              <FaFolderOpen />
            </div>
            <div title="Help" className="hover:text-yellow-400 cursor-pointer">
              <FaChalkboardTeacher />
            </div>
            <div title="Certification" className="hover:text-yellow-400 cursor-pointer">
              <FaGraduationCap />
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 px-4 py-2 rounded text-white w-full flex items-center justify-center gap-2 hover:bg-red-700 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;