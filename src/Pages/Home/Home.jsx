// home.jsx

import React, { useState } from 'react';
import { Play, Heart, MoreHorizontal, Clock, TrendingUp } from 'lucide-react';
import { useMusic } from '../../components/contexts/MusicContext';
import './Home.css'; // Keep this import for custom styles

const Home = () => {
  const { mockTracks, playTrack } = useMusic();
  const [likedTracks, setLikedTracks] = useState(new Set());

  const toggleLike = (trackId) => {
    setLikedTracks(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(trackId)) {
        newLiked.delete(trackId);
      } else {
        newLiked.add(trackId);
      }
      return newLiked;
    });
  };

  const handlePlayTrack = (track) => {
    playTrack(track);
  };

  const handlePlayPlaylist = (playlist) => {
    // For now, play the first track from the playlist
    // In a real app, you'd have playlist data with tracks
    console.log('Playing playlist:', playlist.title);
  };

  // Mock data for featured playlists
  const featuredPlaylists = [
    {
      id: 1,
      title: "Today's Top Hits",
      description: "The most played songs right now",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Chill Vibes",
      description: "Relaxing music for any mood",
      cover: "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Workout Mix",
      description: "High energy tracks to fuel your workout",
      cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Indie Discoveries",
      description: "Fresh indie tracks you need to hear",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Jazz Classics",
      description: "Timeless jazz standards",
      cover: "https://images.unsplash.com/photo-1415201364774-f6f4695c110f?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "Electronic Dreams",
      description: "Futuristic beats and synth waves",
      cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop&crop=center"
    }
  ];

  // Mock data for trending artists
  const trendingArtists = [
    {
      id: 1,
      name: "Luna Eclipse",
      followers: "2.1M",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Neon Waves",
      followers: "1.8M",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Crystal Sound",
      followers: "3.2M",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Midnight Groove",
      followers: "945K",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Echo Valley",
      followers: "1.5M",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Starlight Collective",
      followers: "2.7M",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="home-page container"> {/* Use the global container class */}
      <header className="home-header section"> {/* Use the global section class */}
        <div className="header-content glassmorph text-center p-xl"> {/* Apply glassmorph, text-center, and padding */}
          <h1 className="h1-hero">Good evening</h1> {/* Use the h1-hero class */}
          <p className="lead-muted">Ready to discover your next favorite song?</p> {/* Use lead-muted */}
        </div>
      </header>

      <section className="quick-picks section-sm"> {/* Use section-sm */}
        <div className="section-header">
          <h2 className="h2-section">Jump back in</h2> {/* Use the h2-section class */}
        </div>
        <div className="quick-picks-grid">
          {mockTracks.slice(0, 6).map((track, index) => (
            <div key={track.id} className="quick-pick-item"> {/* Keep for specific styling */}
              <img src={track.cover} alt={track.title} className="quick-pick-cover" />
              <div className="quick-pick-info">
                <span className="track-title">{track.title}</span> {/* Use global track-title */}
              </div>
              <button
                className="quick-pick-play btn-primary"
                onClick={() => handlePlayTrack(track)}
              >
                <Play size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-section section-sm"> {/* Use section-sm */}
        <div className="section-header">
          <h2 className="h2-section">Featured Playlists</h2> {/* Use h2-section */}
          <button className="see-all-btn">See all</button> {/* This is a custom button, so let's keep it */}
        </div>
        <div className="playlists-grid album-grid"> {/* Use album-grid for consistent styling */}
          {featuredPlaylists.map((playlist) => (
            <div key={playlist.id} className="playlist-card card"> {/* Apply the global card class */}
              <div className="playlist-cover-container">
                <img src={playlist.cover} alt={playlist.title} className="playlist-cover img-rounded" /> {/* Use img-rounded */}
                <button
                  className="playlist-play-btn btn-primary"
                  onClick={() => handlePlayPlaylist(playlist)}
                >
                  <Play size={20} />
                </button>
              </div>
              <div className="playlist-info">
                <h3 className="h3-card">{playlist.title}</h3> {/* Use h3-card */}
                <p className="album-artist">{playlist.description}</p> {/* Use album-artist for consistency */}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="trending-section section-sm"> {/* Use section-sm */}
        <div className="section-header">
          <h2 className="h2-section">
            <TrendingUp size={24} className="section-icon" />
            Trending Artists
          </h2>
        </div>
        <div className="artists-grid">
          {trendingArtists.map((artist) => (
            <div key={artist.id} className="artist-card card"> {/* Apply the global card class */}
              <div className="artist-image-container">
                <img src={artist.image} alt={artist.name} className="artist-image avatar" /> {/* Use the global avatar class */}
              </div>
              <div className="artist-info">
                <h3 className="h3-card">{artist.name}</h3> {/* Use h3-card */}
                <p className="lead-muted">{artist.followers} followers</p> {/* Use lead-muted */}
              </div>
              <button className="follow-btn btn btn-outline-light">Follow</button> {/* Use btn-outline-light */}
            </div>
          ))}
        </div>
      </section>

      <section className="recent-tracks-section section-sm"> {/* Use section-sm */}
        <div className="section-header">
          <h2 className="h2-section">
            <Clock size={24} className="section-icon" />
            Recently Played
          </h2>
        </div>
        <div className="tracks-list card"> {/* Apply the global card class */}
          {mockTracks.map((track, index) => (
            <div key={track.id} className="track-item">
              <div className="track-number">{index + 1}</div>
              <div className="track-cover-container">
                <img src={track.cover} alt={track.title} className="track-cover img-rounded" /> {/* Use img-rounded */}
              </div>
              <div className="track-details">
                <h4 className="track-title">{track.title}</h4> {/* Keep as is or check if h4 styling is needed */}
                <p className="track-artist">{track.artist}</p> {/* Keep as is */}
              </div>
              <div className="track-album lead-muted">{track.album}</div> {/* Use lead-muted */}
              <div className="track-actions">
                <button 
                  className={`track-action-btn ${likedTracks.has(track.id) ? 'liked' : ''}`}
                  onClick={() => toggleLike(track.id)}
                >
                  <Heart size={16} />
                </button>
                <span className="track-duration">{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</span>
                <button className="track-action-btn">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;