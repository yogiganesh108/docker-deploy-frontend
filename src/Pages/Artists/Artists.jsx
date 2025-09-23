import React, { useState } from 'react';
import { Play, Heart, UserPlus, MoreHorizontal, Users, Music } from 'lucide-react';
import { useMusic } from '../../components/contexts/MusicContext';
import './Artists.css';

const Artists = () => {
  const { artists, isLoading, error } = useMusic();
  const [followedArtists, setFollowedArtists] = useState(new Set([1, 3]));

  const [selectedArtist, setSelectedArtist] = useState(null);

  const toggleFollow = (artistId) => {
    setFollowedArtists(prev => {
      const newFollowed = new Set(prev);
      if (newFollowed.has(artistId)) {
        newFollowed.delete(artistId);
      } else {
        newFollowed.add(artistId);
      }
      return newFollowed;
    });
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="artists-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading artists...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="artists-page">
        <div className="error-state">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (selectedArtist) {
    return (
      <div className="artist-detail-page">
        <div className="artist-banner-section slide-up">
          <button
            className="back-btn"
            onClick={() => setSelectedArtist(null)}
          >
            ← Back to Artists
          </button>

          <div className="artist-banner">
            <img
              src={selectedArtist.banner}
              alt={selectedArtist.name}
              className="banner-image"
            />
            <div className="banner-overlay"></div>

            <div className="artist-info-overlay">
              <div className="artist-avatar">
                <img
                  src={selectedArtist.image}
                  alt={selectedArtist.name}
                  className="avatar-image"
                />
              </div>

              <div className="artist-details">
                <span className="artist-type">Artist</span>
                <h1 className="artist-name-large">{selectedArtist.name}</h1>
                <div className="artist-stats">
                  <span className="stat">
                    <Users size={16} />
                    {selectedArtist.monthlyListeners} monthly listeners
                  </span>
                  <span className="stat">
                    <Heart size={16} />
                    {selectedArtist.followers} followers
                  </span>
                </div>

                <div className="artist-actions">
                  <button className="btn btn-primary play-artist-btn">
                    <Play size={20} />
                    Play
                  </button>
                  <button
                    className={`follow-btn ${followedArtists.has(selectedArtist.id) ? 'following' : ''}`}
                    onClick={() => toggleFollow(selectedArtist.id)}
                  >
                    <UserPlus size={16} />
                    {followedArtists.has(selectedArtist.id) ? 'Following' : 'Follow'}
                  </button>
                  <button className="artist-more-btn">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="artist-content slide-up">
          <div className="content-section">
            <h2 className="section-title">About</h2>
            <div className="artist-bio">
              <p>{selectedArtist.bio}</p>
              <div className="artist-genre-tag">
                <Music size={14} />
                {selectedArtist.genre}
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2 className="section-title">Popular Tracks</h2>
            <div className="popular-tracks">
              {selectedArtist.topTracks.map((track, index) => (
                <div key={index} className="popular-track-item">
                  <span className="track-rank">{index + 1}</span>
                  <div className="track-info">
                    <h4 className="track-title">{track}</h4>
                    <p className="track-artist">{selectedArtist.name}</p>
                  </div>
                  <button className="track-play-btn">
                    <Play size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="artists-page">
      <header className="artists-header slide-up">
        <h1 className="page-title">Artists</h1>
        <p className="page-subtitle">Discover talented artists and follow your favorites</p>
      </header>

      <div className="artists-grid slide-up">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="artist-card"
            onClick={() => setSelectedArtist(artist)}
          >
            <div className="artist-image-container">
              <img
                src={artist.image}
                alt={artist.name}
                className="artist-image"
              />
              <div className="artist-overlay">
                <button className="artist-play-btn">
                  <Play size={24} />
                </button>
              </div>
            </div>

            <div className="artist-info">
              <h3 className="artist-name">{artist.name}</h3>
              <p className="artist-genre-label">{artist.genre}</p>
              <div className="artist-stats-mini">
                <span className="followers-count">
                  <Users size={12} />
                  {artist.followers}
                </span>
                <span className="listeners-count">
                  {artist.monthlyListeners} monthly
                </span>
              </div>

              <div className="artist-card-actions">
                <button
                  className={`follow-btn-small ${followedArtists.has(artist.id) ? 'following' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFollow(artist.id);
                  }}
                >
                  <UserPlus size={14} />
                  {followedArtists.has(artist.id) ? 'Following' : 'Follow'}
                </button>
                <button
                  className="artist-heart-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
