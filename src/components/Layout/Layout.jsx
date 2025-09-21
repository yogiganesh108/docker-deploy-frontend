import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MusicPlayer from "../MusicPlayer/MusicPlayer.jsx"; // explicit extension
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const Layout = () => {
  // guard if hook isn't available yet
  let auth = { isLoading: false };
  try {
    auth = useAuth() || auth;
  } catch (e) {
    // silently fallback to not-loading so app still renders
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
        <Outlet />
      </main>
      <ErrorBoundary>
        <div className="music-player-container">
          <MusicPlayer />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
