import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, TrendingUp, Music, Users, Heart, Clock, Plus } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: TrendingUp, label: 'Trending', path: '/trending' },
    { icon: Music, label: 'Albums', path: '/albums' },
    { icon: Users, label: 'Artists', path: '/artists' },
  ];

  const playlistItems = [
    { icon: Heart, label: 'Liked Songs', path: '/liked' },
    { icon: Clock, label: 'Recently Played', path: '/recent' },
    { icon: Music, label: 'My Playlists', path: '/playlists' },
  ];

  return (
    <div className="layout-sidebar">
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-title">Discover</h3>
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `sidebar-item ${isActive ? 'active' : ''}`
                    }
                  >
                    <span className="icon">
                      <item.icon size={20} />
                    </span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav-section">
            <h3 className="nav-title">Library</h3>
            <ul className="nav-list">
              {playlistItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `sidebar-item ${isActive ? 'active' : ''}`
                    }
                  >
                    <span className="icon">
                      <item.icon size={20} />
                    </span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <button className="create-playlist-btn">
              <Plus size={20} />
              Create Playlist
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;