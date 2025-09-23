import React, { useEffect, useRef, useState, createContext, useContext, useCallback } from "react";
import {
  fetchAllTracks,
  fetchAllAlbums,
  fetchAllArtists,
  fetchAllPlaylists,
  fetchFeaturedPlaylists,
  fetchTrendingArtists
} from "../../services/musicService";
import { useAuth } from "./AuthContext";

const MusicContext = createContext();

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};

export const MusicProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState("none");
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylistsData] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [trendingArtists, setTrendingArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const audioRef = useRef(new Audio());

  // Load initial data from backend
  useEffect(() => {
    if (isAuthenticated) {
      const loadData = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const [trackData, albumData, artistData, playlistData, featuredPlaylistData, trendingArtistData] = await Promise.all([
            fetchAllTracks(),
            fetchAllAlbums(),
            fetchAllArtists(),
            fetchAllPlaylists(),
            fetchFeaturedPlaylists(),
            fetchTrendingArtists()
          ]);
          setTracks(trackData);
          setAlbums(albumData); // ✅ REMOVED STRAY 'p' CHARACTER HERE
          setArtists(artistData);
          setPlaylistsData(playlistData);
          setFeaturedPlaylists(featuredPlaylistData);
          setTrendingArtists(trendingArtistData);
          if (trackData?.length > 0) setPlaylist(trackData);
        } catch (err) {
          console.error("Error loading data:", err);
          setError("Failed to load music data.");
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    } else {
      // If user logs out, clear all data
      setTracks([]);
      setAlbums([]);
      setArtists([]);
      setPlaylistsData([]);
      setFeaturedPlaylists([]);
      setTrendingArtists([]);
      setPlaylist([]);
      setCurrentTrack(null);
      setIsPlaying(false);
    }
  }, [isAuthenticated]);
  
  const togglePlayPause = () => {
    if (!currentTrack) return;
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  };
  
  const playTrack = useCallback((track, trackIndex = null) => {
    if (currentTrack?.id === track.id) {
      togglePlayPause();
      return;
    }
    setCurrentTrack(track);
    if (trackIndex !== null) setCurrentIndex(trackIndex);
    setIsPlaying(true);
  }, [currentTrack, togglePlayPause]);

  const nextTrack = useCallback(() => {
    if (playlist.length === 0) return;
    const newIndex = isShuffling
      ? Math.floor(Math.random() * playlist.length)
      : (currentIndex + 1);
    
    if (newIndex >= playlist.length) {
      if (repeatMode === 'all') {
        playTrack(playlist[0], 0);
      } else {
        setIsPlaying(false);
      }
      return;
    }
    playTrack(playlist[newIndex], newIndex);
  }, [currentIndex, isShuffling, playlist, repeatMode, playTrack]);
  
  const prevTrack = useCallback(() => {
      if (playlist.length === 0) return;
      const newIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      playTrack(playlist[newIndex], newIndex);
  }, [currentIndex, playlist, playTrack]);

  const handleTrackEnd = useCallback(() => {
    if (repeatMode === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      nextTrack();
    }
  }, [repeatMode, nextTrack]);

  // Effect to control the audio element source and play
  useEffect(() => {
    if (currentTrack?.fileUrl) {
      audioRef.current.src = currentTrack.fileUrl;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  // Effect for audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);
    
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("ended", handleTrackEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("ended", handleTrackEnd);
    };
  }, [handleTrackEnd]);

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolumeLevel = (level) => {
    setVolume(level);
    if (audioRef.current) {
      audioRef.current.volume = level;
    }
  };

  const toggleShuffle = () => setIsShuffling(!isShuffling);

  const toggleRepeat = () => {
    const modes = ["none", "one", "all"];
    const currentModeIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentModeIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };
  
  const formatTime = (seconds) => {
      if (isNaN(seconds) || seconds < 0) return "0:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const value = {
    currentTrack,
    isPlaying,
    duration,
    currentTime,
    volume,
    isShuffling,
    repeatMode,
    playlist,
    currentIndex,
    tracks,
    albums,
    artists,
    playlists,
    featuredPlaylists,
    trendingArtists,
    isLoading,
    error,
    audioRef,
    playTrack,
    togglePlayPause,
    nextTrack,
    prevTrack,
    seekTo,
    setVolumeLevel,
    toggleShuffle,
    toggleRepeat,
    formatTime,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};

