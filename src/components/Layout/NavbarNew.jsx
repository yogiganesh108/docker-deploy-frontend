import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Layout.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        {/* Left side - Brand Title */}
        <div className="navbar-left">
          <Link to="/" className="brand-link">
            <div className="brand-icon">🎵</div>
            <span className="brand-text">BeatFlow</span>
          </Link>
        </div>

        {/* Center - Search Bar */}
        <div className="navbar-center">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <Search size={18} className="search-icon" />
              <input
                type="search"
                placeholder="Search for songs, artists, albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </form>
        </div>

        {/* Right side - User Menu */}
        <div className="navbar-right">
          <div className="user-menu">
            <button
              className="user-menu-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <Settings size={20} />
            </button>
            {showUserMenu && (
              <div className="user-dropdown">
                <button className="dropdown-item" onClick={() => navigate('/profile')}>
                  <User size={16} />
                  Profile
                </button>
                <button className="dropdown-item" onClick={() => navigate('/settings')}>
                  <Settings size={16} />
                  Settings
                </button>
                <hr />
                <button className="dropdown-item" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
