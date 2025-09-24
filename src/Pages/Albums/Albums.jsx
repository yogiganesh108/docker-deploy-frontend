import React, { useState } from 'react';
import { Play, Heart, MoreHorizontal, Calendar, Clock } from 'lucide-react';
import { useMusic } from '../../components/contexts/MusicContext';
import './Albums.css';

const Albums = () => {
    const { albums, playTrack, isLoading, error } = useMusic();
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [likedAlbums, setLikedAlbums] = useState(new Set());
    console.log("Albums data:", albums);

    const toggleLike = (albumId, e) => {
        e.stopPropagation();
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

    const formatDuration = (totalSeconds) => {
        if (isNaN(totalSeconds) || totalSeconds < 0) return "0:00";
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (isLoading) {
        return (
            <div className="albums-page">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading albums...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="albums-page">
                <div className="error-state">
                    <h2>Something went wrong</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (selectedAlbum) {
        const totalDurationSeconds = selectedAlbum.tracks?.reduce((sum, track) => sum + (track.duration || 0), 0);
        const albumDurationFormatted = formatDuration(totalDurationSeconds);

        return (
            <div className="album-detail-page">
                <div className="album-header slide-up">
                    <button className="back-btn" onClick={() => setSelectedAlbum(null)}>
                        ← Back to Albums
                    </button>
                    <div className="album-hero">
                        <div className="album-cover-large">
                            <img src={selectedAlbum.coverUrl} alt={selectedAlbum.title} className="album-image-large" />
                        </div>
                        <div className="album-details">
                            <span className="album-type">Album</span>
                            <h1 className="album-title-large">{selectedAlbum.title}</h1>
                            <div className="album-meta">
                                <span className="album-artist-large">{selectedAlbum.artist?.stageName}</span>
                                <span className="separator">•</span>
                                <span className="album-year">{new Date(selectedAlbum.releaseDate).getFullYear()}</span>
                                <span className="separator">•</span>
                                <span className="album-stats">{selectedAlbum.tracks?.length || 0} songs, {albumDurationFormatted}</span>
                            </div>
                            <div className="album-actions">
                                <button className="btn btn-primary play-album-btn" onClick={() => selectedAlbum.tracks?.length > 0 && playTrack(selectedAlbum.tracks[0])}>
                                    <Play size={20} /> Play Album
                                </button>
                                <button className={`album-like-btn ${likedAlbums.has(selectedAlbum.id) ? 'liked' : ''}`} onClick={(e) => toggleLike(selectedAlbum.id, e)}>
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
                        <span className="track-duration-header"><Clock size={16} /></span>
                    </div>
                    <div className="tracks-list">
                        {selectedAlbum.tracks?.map((track, index) => (
                            <div key={track.id} className="track-row" onClick={() => playTrack(track, index)}>
                                <span className="track-number">{index + 1}</span>
                                <div className="track-info">
                                    <h4 className="track-name">{track.title}</h4>
                                    <p className="track-artist-name">{track.artist?.stageName}</p>
                                </div>
                                <div className="track-actions">
                                    <button className="track-like-btn"><Heart size={16} /></button>
                                    <span className="track-duration">{formatDuration(track.duration)}</span>
                                    <button className="track-menu-btn"><MoreHorizontal size={16} /></button>
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
                {albums?.map((album) => (
                    <div key={album.id} className="album-card" onClick={() => setSelectedAlbum(album)}>
                        <div className="album-cover-container">
                            <img src={album.coverUrl} alt={album.title} className="album-cover" />
                            <div className="album-overlay">
                                <button className="album-play-btn" onClick={(e) => { e.stopPropagation(); album.tracks?.length > 0 && playTrack(album.tracks[0]); }}>
                                    <Play size={24} />
                                </button>
                                <div className="album-quick-actions">
                                    <button className={`quick-action-btn ${likedAlbums.has(album.id) ? 'liked' : ''}`} onClick={(e) => toggleLike(album.id, e)}>
                                        <Heart size={16} />
                                    </button>
                                    <button className="quick-action-btn" onClick={(e) => e.stopPropagation()}>
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="album-info">
                            <h3 className="album-title">{album.title}</h3>
                            <p className="album-artist">{album.artist?.stageName}</p>
                            <div className="album-metadata">
                                <span className="album-year-badge">
                                    <Calendar size={12} />
                                    {new Date(album.releaseDate).getFullYear()}
                                </span>
                                <span className="album-genre">{album.artist?.genre}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Albums;
