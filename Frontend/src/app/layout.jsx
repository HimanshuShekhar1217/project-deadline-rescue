import React from "react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import "../styles/dashboard.css";

/**
 * Root layout shell — Navbar + Sidebar wrapper.
 * Any page rendered inside <Layout> gets the persistent shell.
 */
const Layout = ({ children }) => {
  return (
    <div className="app-shell" data-testid="app-shell">
      <Sidebar />
      <div className="app-main">
        <Navbar />
        <main className="app-content" data-testid="app-content">
          <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
            {/* Top Glow */}
            <div className="absolute top-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[180px]" />

            {/* Bottom Right Glow */}
            <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-emerald-400/10 blur-[150px]" />

            {/* Content */}
            <div className="relative z-10"> 
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
