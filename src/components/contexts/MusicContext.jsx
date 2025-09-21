import React, { useEffect, useRef, useState, createContext, useContext } from "react";

const MusicContext = createContext();

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};

export const MusicProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState("none");
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const audioRef = useRef(null);

  // Load initial tracks
  useEffect(() => {
    const loadInitialTracks = async () => {
      try {
        // For now, use mock data since API service might not be available
        const mockTracks = [
          {
            id: 1,
            title: "Midnight Dreams",
            artist: "Luna Echo",
            album: "Nocturnal Waves",
            duration: 245,
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
            audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
          },
          {
            id: 2,
            title: "Electric Pulse",
            artist: "Neon Nights",
            album: "Synthwave Stories",
            duration: 198,
            cover: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
            audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
          },
          {
            id: 3,
            title: "Ocean Breeze",
            artist: "Coastal Vibes",
            album: "Summer Anthology",
            duration: 267,
            cover: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
            audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
          },
        ];
        setPlaylist(mockTracks);
      } catch (error) {
        console.error("Error loading tracks:", error);
      }
    };
    loadInitialTracks();
  }, []);

  // Handle play/pause state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle audio element setup and event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleTrackEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleTrackEnd);
    };
  }, [currentTrack]);

  const handleTrackEnd = () => {
    if (repeatMode === "one") {
      playTrack(currentTrack);
    } else {
      nextTrack();
    }
  };

  const playTrack = (track, trackIndex = null) => {
    if (currentTrack && currentTrack.id === track.id) {
      togglePlayPause();
      return;
    }
    setCurrentTrack(track);
    if (trackIndex !== null) {
      setCurrentIndex(trackIndex);
    }
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    if (playlist.length === 0) return;
    let nextIndex;
    if (isShuffling) {
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (nextIndex === currentIndex);
    } else if (repeatMode === "all" && currentIndex === playlist.length - 1) {
      nextIndex = 0;
    } else if (currentIndex < playlist.length - 1) {
      nextIndex = currentIndex + 1;
    } else {
      setIsPlaying(false);
      return;
    }
    setCurrentIndex(nextIndex);
    playTrack(playlist[nextIndex], nextIndex);
  };

  const prevTrack = () => {
    if (playlist.length === 0) return;
    let prevIndex;
    if (currentIndex > 0) {
      prevIndex = currentIndex - 1;
    } else if (repeatMode === "all") {
      prevIndex = playlist.length - 1;
    } else {
      seekTo(0);
      return;
    }
    setCurrentIndex(prevIndex);
    playTrack(playlist[prevIndex], prevIndex);
  };

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

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const toggleRepeat = () => {
    const modes = ["none", "one", "all"];
    const currentModeIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentModeIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  const formatTime = (seconds) => {
    if (!seconds) return "0:00";
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
    mockTracks: playlist,
    playTrack,
    togglePlayPause,
    nextTrack,
    prevTrack,
    seekTo,
    setVolumeLevel,
    toggleShuffle,
    toggleRepeat,
    formatTime,
    audioRef,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      <audio ref={audioRef} src={currentTrack?.audio} />
    </MusicContext.Provider>
  );
};
