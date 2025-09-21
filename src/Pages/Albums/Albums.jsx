import React, { useState } from 'react';
import { Play, Heart, MoreHorizontal, Calendar, Clock } from 'lucide-react';
import { useMusic } from '../../components/contexts/MusicContext';
import './Albums.css';

const Albums = () => {
  const { mockTracks, playTrack } = useMusic();
  
  const mockAlbums = [
    {
      id: 1,
      title: 'Nocturnal Waves',
      artist: 'Luna Echo',
      year: 2024,
      cover: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      trackCount: 12,
      duration: '45:23',
      genre: 'Electronic',
      tracks: mockTracks
    },
    {
      id: 2,
      title: 'Synthwave Stories',
      artist: 'Neon Nights',
      year: 2024,
      cover: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      trackCount: 10,
      duration: '38:45',
      genre: 'Synthwave',
      tracks: mockTracks.slice(0, 2)
    },
    {
      id: 3,
      title: 'Summer Anthology',
      artist: 'Coastal Vibes',
      year: 2023,
      cover: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      trackCount: 15,
      duration: '52:18',
      genre: 'Indie Pop',
      tracks: mockTracks.slice(1)
    },
    {
      id: 4,
      title: 'Urban Dreams',
      artist: 'Metro Sound',
      year: 2023,
      cover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      trackCount: 14,
      duration: '48:32',
      genre: 'Hip Hop',
      tracks: mockTracks
    },
    {
      id: 5,
      title: 'Midnight Jazz',
      artist: 'Smooth Collective',
      year: 2023,
      cover: 'https://images.pexels.com/photos/462093/pexels-photo-462093.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      trackCount: 8,
      duration: '41:15',
      genre: 'Jazz',
      tracks: mockTracks.slice(0, 2)
    },
    {
      id: 6,
      title: 'Rock Rebellion',
      artist: 'Thunder Strike',
      year: 2022,
      cover: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      trackCount: 11,
      duration: '44:07',
      genre: 'Rock',
      tracks: mockTracks.slice(1, 3)
    }
  ];

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [likedAlbums, setLikedAlbums] = useState(new Set());

  const toggleLike = (albumId) => {
    setLikedAlbums(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(albumId)) {
        newLiked.delete(albumId);
      } else {
        newLiked.add(albumId);
      }
      return newLiked;
    });
  };

  if (selectedAlbum) {
    return (
      <div className="album-detail-page">
        <div className="album-header slide-up">
          <button 
            className="back-btn"
            onClick={() => setSelectedAlbum(null)}
          >
            ← Back to Albums
          </button>
          
          <div className="album-hero">
            <div className="album-cover-large">
              <img 
                src={selectedAlbum.cover} 
                alt={selectedAlbum.title}
                className="album-image-large"
              />
            </div>
            
            <div className="album-details">
              <span className="album-type">Album</span>
              <h1 className="album-title-large">{selectedAlbum.title}</h1>
              <div className="album-meta">
                <span className="album-artist-large">{selectedAlbum.artist}</span>
                <span className="separator">•</span>
                <span className="album-year">{selectedAlbum.year}</span>
                <span className="separator">•</span>
                <span className="album-stats">{selectedAlbum.trackCount} songs, {selectedAlbum.duration}</span>
              </div>
              
              <div className="album-actions">
                <button className="btn btn-primary play-album-btn">
                  <Play size={20} />
                  Play Album
                </button>
                <button 
                  className={`album-like-btn ${likedAlbums.has(selectedAlbum.id) ? 'liked' : ''}`}
                  onClick={() => toggleLike(selectedAlbum.id)}
                >
                  <Heart size={20} />
                </button>
                <button className="album-more-btn">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="album-tracks slide-up">
          <div className="tracks-header">
            <span className="track-number-header">#</span>
            <span className="track-title-header">Title</span>
            <span className="track-duration-header">
              <Clock size={16} />
            </span>
          </div>
          
          <div className="tracks-list">
            {selectedAlbum.tracks.map((track, index) => (
              <div 
                key={track.id} 
                className="track-row"
                onClick={() => playTrack(track, index)}
              >
                <span className="track-number">{index + 1}</span>
                <div className="track-info">
                  <h4 className="track-name">{track.title}</h4>
                  <p className="track-artist-name">{track.artist}</p>
                </div>
                <div className="track-actions">
                  <button className="track-like-btn">
                    <Heart size={16} />
                  </button>
                  <span className="track-duration">
                    {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                  </span>
                  <button className="track-menu-btn">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="albums-page">
      <header className="albums-header slide-up">
        <h1 className="page-title">Albums</h1>
        <p className="page-subtitle">Discover complete musical journeys from your favorite artists</p>
      </header>

      <div className="albums-grid slide-up">
        {mockAlbums.map((album) => (
          <div 
            key={album.id} 
            className="album-card"
            onClick={() => setSelectedAlbum(album)}
          >
            <div className="album-cover-container">
              <img 
                src={album.cover} 
                alt={album.title}
                className="album-cover"
              />
              <div className="album-overlay">
                <button className="album-play-btn">
                  <Play size={24} />
                </button>
                <div className="album-quick-actions">
                  <button 
                    className={`quick-action-btn ${likedAlbums.has(album.id) ? 'liked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(album.id);
                    }}
                  >
                    <Heart size={16} />
                  </button>
                  <button 
                    className="quick-action-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="album-info">
              <h3 className="album-title">{album.title}</h3>
              <p className="album-artist">{album.artist}</p>
              <div className="album-metadata">
                <span className="album-year-badge">
                  <Calendar size={12} />
                  {album.year}
                </span>
                <span className="album-genre">{album.genre}</span>
              </div>
              <div className="album-stats-mini">
                <span>{album.trackCount} tracks</span>
                <span className="separator">•</span>
                <span>{album.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Albums;