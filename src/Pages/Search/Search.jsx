import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Play, Heart, MoreHorizontal } from 'lucide-react';
import { useMusic } from '../../components/contexts/MusicContext';
import './Search.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all');
  const { mockTracks, playTrack } = useMusic();

  // Mock search results
  const mockSearchResults = {
    tracks: mockTracks,
    artists: [
      {
        id: 1,
        name: 'Luna Echo',
        followers: '2.1M',
        image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
      },
      {
        id: 2,
        name: 'Neon Nights',
        followers: '1.8M',
        image: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
      }
    ],
    albums: [
      {
        id: 1,
        title: 'Nocturnal Waves',
        artist: 'Luna Echo',
        year: 2024,
        cover: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
      },
      {
        id: 2,
        title: 'Synthwave Stories',
        artist: 'Neon Nights',
        year: 2024,
        cover: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
      }
    ],
    playlists: [
      {
        id: 1,
        title: 'Electronic Dreams',
        description: 'Best electronic music',
        trackCount: 45,
        cover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
      }
    ]
  };

  const [results, setResults] = useState(mockSearchResults);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchQuery]);

  const performSearch = async (query) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter results based on search query
      const filteredResults = {
        tracks: mockSearchResults.tracks.filter(track =>
          track.title.toLowerCase().includes(query.toLowerCase()) ||
          track.artist.toLowerCase().includes(query.toLowerCase())
        ),
        artists: mockSearchResults.artists.filter(artist =>
          artist.name.toLowerCase().includes(query.toLowerCase())
        ),
        albums: mockSearchResults.albums.filter(album =>
          album.title.toLowerCase().includes(query.toLowerCase()) ||
          album.artist.toLowerCase().includes(query.toLowerCase())
        ),
        playlists: mockSearchResults.playlists.filter(playlist =>
          playlist.title.toLowerCase().includes(query.toLowerCase()) ||
          playlist.description.toLowerCase().includes(query.toLowerCase())
        )
      };
      
      setResults(filteredResults);
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'tracks', label: 'Songs' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' },
    { id: 'playlists', label: 'Playlists' }
  ];

  const renderTracks = (tracks) => (
    <div className="tracks-section">
      <h3 className="section-title">Songs</h3>
      <div className="tracks-list">
        {tracks.slice(0, activeTab === 'tracks' ? tracks.length : 5).map((track, index) => (
          <div key={track.id} className="track-item" onClick={() => playTrack(track, index)}>
            <div className="track-cover-container">
              <img src={track.cover} alt={track.title} className="track-cover" />
              <button className="track-play-btn">
                <Play size={16} />
              </button>
            </div>
            <div className="track-details">
              <h4 className="track-title">{track.title}</h4>
              <p className="track-artist">{track.artist}</p>
            </div>
            <div className="track-actions">
              <button className="track-action-btn">
                <Heart size={16} />
              </button>
              <span className="track-duration">
                {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
              </span>
              <button className="track-action-btn">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderArtists = (artists) => (
    <div className="artists-section">
      <h3 className="section-title">Artists</h3>
      <div className="artists-grid">
        {artists.slice(0, activeTab === 'artists' ? artists.length : 4).map((artist) => (
          <div key={artist.id} className="artist-card">
            <div className="artist-image-container">
              <img src={artist.image} alt={artist.name} className="artist-image" />
              <button className="artist-play-btn">
                <Play size={20} />
              </button>
            </div>
            <div className="artist-info">
              <h4 className="artist-name">{artist.name}</h4>
              <p className="artist-followers">{artist.followers} followers</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAlbums = (albums) => (
    <div className="albums-section">
      <h3 className="section-title">Albums</h3>
      <div className="albums-grid">
        {albums.slice(0, activeTab === 'albums' ? albums.length : 4).map((album) => (
          <div key={album.id} className="album-card">
            <div className="album-cover-container">
              <img src={album.cover} alt={album.title} className="album-cover" />
              <button className="album-play-btn">
                <Play size={20} />
              </button>
            </div>
            <div className="album-info">
              <h4 className="album-title">{album.title}</h4>
              <p className="album-artist">{album.artist} • {album.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlaylists = (playlists) => (
    <div className="playlists-section">
      <h3 className="section-title">Playlists</h3>
      <div className="playlists-grid">
        {playlists.slice(0, activeTab === 'playlists' ? playlists.length : 4).map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <div className="playlist-cover-container">
              <img src={playlist.cover} alt={playlist.title} className="playlist-cover" />
              <button className="playlist-play-btn">
                <Play size={20} />
              </button>
            </div>
            <div className="playlist-info">
              <h4 className="playlist-title">{playlist.title}</h4>
              <p className="playlist-description">{playlist.description}</p>
              <span className="playlist-track-count">{playlist.trackCount} songs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const hasResults = results.tracks.length > 0 || results.artists.length > 0 || 
                   results.albums.length > 0 || results.playlists.length > 0;

  return (
    <div className="search-page">
      <header className="search-header slide-up">
        <form className="search-form-main" onSubmit={handleSearch}>
          <div className="search-input-container">
            <SearchIcon className="search-input-icon" size={20} />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              className="search-input-main"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
              >
                ×
              </button>
            )}
          </div>
        </form>
      </header>

      {searchQuery && (
        <>
          <div className="search-tabs slide-up">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="search-results slide-up">
            {isLoading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Searching...</p>
              </div>
            ) : hasResults ? (
              <div className="results-content">
                {(activeTab === 'all' || activeTab === 'tracks') && results.tracks.length > 0 && renderTracks(results.tracks)}
                {(activeTab === 'all' || activeTab === 'artists') && results.artists.length > 0 && renderArtists(results.artists)}
                {(activeTab === 'all' || activeTab === 'albums') && results.albums.length > 0 && renderAlbums(results.albums)}
                {(activeTab === 'all' || activeTab === 'playlists') && results.playlists.length > 0 && renderPlaylists(results.playlists)}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No results found for "{searchQuery}"</h3>
                <p>Try searching for something else or check your spelling</p>
              </div>
            )}
          </div>
        </>
      )}

      {!searchQuery && (
        <div className="search-suggestions slide-up">
          <div className="suggestions-section">
            <h2 className="section-title">Browse Categories</h2>
            <div className="categories-grid">
              {['Pop', 'Rock', 'Electronic', 'Hip Hop', 'Jazz', 'Classical'].map((category) => (
                <div key={category} className="category-card" onClick={() => setSearchQuery(category)}>
                  <span className="category-name">{category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="suggestions-section">
            <h2 className="section-title">Recent Searches</h2>
            <div className="recent-searches">
              {['Luna Echo', 'Electronic Dreams', 'Chill Vibes'].map((term) => (
                <button
                  key={term}
                  className="recent-search-item"
                  onClick={() => setSearchQuery(term)}
                >
                  <SearchIcon size={16} />
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;