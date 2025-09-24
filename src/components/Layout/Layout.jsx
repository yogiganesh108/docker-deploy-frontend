import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import MusicPlayer from '../MusicPlayer/MusicPlayer'; // This import is correct
import Sidebar from "./Sidebar";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const Layout = () => {
  // This part for handling auth loading is fine.
  let auth = { isLoading: false };
  try {
    auth = useAuth() || auth;
  } catch (e) {
    // silently fallback
  }
  const { isLoading } = auth;

  if (isLoading) {
    return (
      <div className="layout-loading" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner" aria-hidden="true">Loading…</div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <header className="layout-header">
        <div className="navbar-container">
          <Navbar />
        </div>
      </header>
      <aside className="layout-sidebar">
        <Sidebar />
      </aside>
      <main className="app-main">
        {/* Your different pages (Home, Albums, etc.) render here */}
        <Outlet />
      </main>
      <ErrorBoundary>
        <div className="music-player-container">
          {/* ✅ Corrected: The MusicPlayer component is now being rendered */}
          <MusicPlayer />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
