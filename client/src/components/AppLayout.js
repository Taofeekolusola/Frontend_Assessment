// src/App.jsx or Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";

function AppLayout() {
  const { pathname } = useLocation();
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Your sidebar/nav should be above here */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Render footer only on non-auth pages */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default AppLayout;