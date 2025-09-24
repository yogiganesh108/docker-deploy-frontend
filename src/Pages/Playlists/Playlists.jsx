import React, { useState } from 'react';
import { Play, Plus, Heart, MoreHorizontal, Search } from 'lucide-react';
import { useMusic } from '../../components/contexts/MusicContext';
import './Playlists.css';

const Playlists = () => {
  const { playlists, tracks, playTrack, isLoading, error } = useMusic();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="playlists-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading playlists...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="playlists-page">
        <div className="error-state">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="playlists-page">
      <header className="playlists-header slide-up">
        <div className="header-content">
          <h1 className="page-title">Your Playlists</h1>
          <p className="page-subtitle">Organize your music the way you like it</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary create-playlist-btn">
            <Plus size={20} />
            Create Playlist
          </button>
        </div>
      </header>

      <div className="playlists-controls slide-up">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search playlists..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="view-options">
          <button className="view-btn active">Grid</button>
          <button className="view-btn">List</button>
        </div>
      </div>

      <div className="playlists-grid slide-up">
        {filteredPlaylists.map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <div className="playlist-cover-container">
              <img
                src={playlist.cover}
                alt={playlist.title}
                className="playlist-cover"
              />
              <div className="playlist-overlay">
                <button className="playlist-play-btn">
                  <Play size={24} />
                </button>
                <div className="playlist-actions">
                  <button className="playlist-action-btn">
                    <Heart size={16} />
                  </button>
                  <button className="playlist-action-btn">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
              <div className="playlist-stats">
                <span className="track-count">{playlist.trackCount} songs</span>
                <span className="duration">{playlist.duration}</span>
              </div>
            </div>

            <div className="playlist-info">
              <h3 className="playlist-title">{playlist.title}</h3>
              <p className="playlist-description">{playlist.description}</p>
              <div className="playlist-meta">
                <span className={`privacy-badge ${playlist.isPublic ? 'public' : 'private'}`}>
                  {playlist.isPublic ? 'Public' : 'Private'}
                </span>
                <span className="created-date">
                  Created {new Date(playlist.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlaylists.length === 0 && (
        <div className="empty-state slide-up">
          <div className="empty-icon">🎵</div>
          <h3>No playlists found</h3>
          <p>
            {searchQuery ?
              `No playlists match "${searchQuery}"` :
              "You haven't created any playlists yet"
            }
          </p>
          <button className="btn btn-primary">
            <Plus size={20} />
            Create Your First Playlist
          </button>
        </div>
      )}

      <section className="featured-tracks-section slide-up">
        <div className="section-header">
          <h2 className="section-title">Made for You</h2>
        </div>
        <div className="tracks-grid">
          {tracks.slice(0, 6).map((track, index) => (
            <div key={track.id} className="track-card">
              <div className="track-cover-container">
                <img src={track.cover} alt={track.title} className="track-cover" />
                <button
                  className="track-play-btn"
                  onClick={() => playTrack(track, index)}
                >
                  <Play size={16} />
                </button>
              </div>
              <div className="track-info">
                <h4 className="track-title">{track.title}</h4>
                <p className="track-artist">{track.artist}</p>
              </div>
              <button className="track-add-btn" title="Add to playlist">
                <Plus size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Playlists;
