import React, { useState } from 'react';
import { Play, Heart, MoreHorizontal, Clock, TrendingUp } from 'lucide-react';
import { useMusic } from '../../components/contexts/MusicContext';
import './Home.css';

const Home = () => {
    // Get all necessary data and functions from the central MusicContext
    const { 
        tracks, 
        featuredPlaylists, 
        trendingArtists, 
        isLoading, 
        error, 
        playTrack 
    } = useMusic();
    
    // Local state for likes can remain here
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
    
    // Loading and Error states are handled correctly by the context
    if (isLoading) {
        return (
            <div className="home-page container">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading your music...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-page container">
                <div className="error-state">
                    <h2>Something went wrong</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="home-page container">
            <header className="home-header section">
                <div className="header-content glassmorph text-center p-xl">
                    <h1 className="h1-hero">Good evening</h1>
                    <p className="lead-muted">Ready to discover your next favorite song?</p>
                </div>
            </header>

            <section className="quick-picks section-sm">
                <div className="section-header">
                    <h2 className="h2-section">Jump back in</h2>
                </div>
                <div className="quick-picks-grid">
                    {/* Use the 'tracks' from the context */}
                    {tracks?.slice(0, 6).map((track) => (
                        <div key={track.id} className="quick-pick-item">
                            <img src={track.album?.coverUrl} alt={track.title} className="quick-pick-cover" />
                            <div className="quick-pick-info">
                                <span className="track-title">{track.title}</span>
                            </div>
                            <button className="quick-pick-play btn-primary" onClick={() => playTrack(track)}>
                                <Play size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="featured-section section-sm">
                 <div className="section-header">
                    <h2 className="h2-section">Featured Playlists</h2>
                    <button className="see-all-btn">See all</button>
                </div>
                <div className="playlists-grid album-grid">
                    {featuredPlaylists?.map((playlist) => (
                        <div key={playlist.id} className="playlist-card card">
                            <img src={playlist.coverUrl} alt={playlist.name} className="playlist-cover img-rounded" />
                            <div className="playlist-info">
                                <h3 className="h3-card">{playlist.name}</h3>
                                <p className="album-artist">{playlist.description || `By ${playlist.owner?.name}`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* <section className="trending-section section-sm">
                <div className="section-header">
                    <h2 className="h2-section">
                        <TrendingUp size={24} className="section-icon" />
                        Trending Artists
                    </h2>
                </div>
                <div className="artists-grid">
                    {trendingArtists?.map((artist) => (
                        <div key={artist.id} className="artist-card card">
                            <img src={artist.imageUrl} alt={artist.stageName} className="artist-image avatar" />
                            <div className="artist-info">
                                <h3 className="h3-card">{artist.stageName}</h3>
                                <p className="lead-muted">{artist.followers || '0'} followers</p>
                            </div>
                            <button className="follow-btn btn btn-outline-light">Follow</button>
                        </div>
                    ))}
                </div>
            </section> */}
            
            {/* <section className="recent-tracks-section section-sm">
                <div className="section-header">
                    <h2 className="h2-section">
                        <Clock size={24} className="section-icon" />
                        Recently Played
                    </h2>
                </div>
                <div className="tracks-list card">
                    {tracks?.map((track, index) => (
                        <div key={track.id} className="track-item" onClick={() => playTrack(track)}>
                            <div className="track-number">{index + 1}</div>
                            <div className="track-cover-container">
                                <img src={track.album?.coverUrl} alt={track.title} className="track-cover img-rounded" />
                            </div>
                            <div className="track-details">
                                <h4 className="track-title">{track.title}</h4>
                                <p className="track-artist">{track.artist?.stageName}</p>
                            </div>
                            <div className="track-album lead-muted">{track.album?.title}</div>
                            <div className="track-actions">
                                <button 
                                    className={`track-action-btn ${likedTracks.has(track.id) ? 'liked' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); toggleLike(track.id); }}
                                >
                                    <Heart size={16} />
                                </button>
                                <span className="track-duration"></span>
                                <button className="track-action-btn" onClick={(e) => e.stopPropagation()}>
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section> */}
        </div>
    );
};

export default Home;
