import React, { useState } from 'react';
import { Play, Heart, UserPlus, MoreHorizontal, Users, Music } from 'lucide-react';
import './Artists.css';

const Artists = () => {
  const [followedArtists, setFollowedArtists] = useState(new Set([1, 3]));

  const mockArtists = [
    {
      id: 1,
      name: 'Luna Echo',
      followers: '2.1M',
      monthlyListeners: '1.8M',
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      banner: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
      genre: 'Electronic',
      bio: 'Luna Echo creates atmospheric electronic music that blends dreamy synths with powerful beats.',
      topTracks: [
        'Midnight Dreams',
        'Stellar Nights',
        'Cosmic Dance'
      ]
    },
    {
      id: 2,
      name: 'Neon Nights',
      followers: '1.8M',
      monthlyListeners: '1.5M',
      image: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      banner: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
      genre: 'Synthwave',
      bio: 'Neon Nights brings the essence of 80s synthwave into the modern era with nostalgic melodies.',
      topTracks: [
        'Electric Pulse',
        'Retro Future',
        'Neon Glow'
      ]
    },
    {
      id: 3,
      name: 'Coastal Vibes',
      followers: '1.2M',
      monthlyListeners: '980K',
      image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      banner: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
      genre: 'Indie Pop',
      bio: 'Coastal Vibes delivers feel-good indie pop with sunny melodies perfect for beach days.',
      topTracks: [
        'Ocean Breeze',
        'Summer Days',
        'Waves'
      ]
    },
    {
      id: 4,
      name: 'Metro Sound',
      followers: '950K',
      monthlyListeners: '750K',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      banner: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
      genre: 'Hip Hop',
      bio: 'Metro Sound represents the urban sound with innovative hip hop beats and meaningful lyrics.',
      topTracks: [
        'City Lights',
        'Urban Dreams',
        'Street Poetry'
      ]
    },
    {
      id: 5,
      name: 'Smooth Collective',
      followers: '670K',
      monthlyListeners: '520K',
      image: 'https://images.pexels.com/photos/462093/pexels-photo-462093.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      banner: 'https://images.pexels.com/photos/462093/pexels-photo-462093.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
      genre: 'Jazz',
      bio: 'Smooth Collective brings contemporary jazz with a modern twist, perfect for late night listening.',
      topTracks: [
        'Midnight Jazz',
        'Smooth Operator',
        'Late Night Session'
      ]
    },
    {
      id: 6,
      name: 'Thunder Strike',
      followers: '1.1M',
      monthlyListeners: '890K',
      image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      banner: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
      genre: 'Rock',
      bio: 'Thunder Strike delivers powerful rock anthems with electrifying guitar solos and dynamic vocals.',
      topTracks: [
        'Lightning Bolt',
        'Rock Rebellion',
        'Thunder Road'
      ]
    }
  ];

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
        {mockArtists.map((artist) => (
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