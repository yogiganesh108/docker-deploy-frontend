import React, { useEffect, useRef, useState } from "react";
import { useMusic } from "../contexts/MusicContext";
import "./MusicPlayer.css";

export default function MusicPlayer() {
  const music = useMusic();

  const {
    currentTrack,
    isPlaying: contextPlaying,
    togglePlayPause,
    currentTime = 0,
    duration = 0,
    formatTime,
    audioRef,
    volume,
    nextTrack,
    prevTrack,
    seekTo,
    setVolumeLevel,
    playlist,
    playTrack,
  } = music || {};

  // Function definitions - moved before they're used
  const handleVolumeChange = (e) => {
    setVolumeLevel(parseFloat(e.target.value));
  };

  // If there's no context, don't render the player.
  if (!music) {
    return null;
  }

  // If there's no current track, show a placeholder
  if (!currentTrack) {
    return (
      <div className="music-player glassmorph" role="region" aria-label="Music player">
        <div className="mp-left">
          <div className="cover-wrap">
            <div className="cover fallback" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                <path d="M9 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="currentColor" />
                <path d="M9 11V3l10-1v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>
          <div className="meta">
            <div className="title" style={{color: 'var(--muted)'}}>No track selected</div>
            <div className="artist" style={{color: 'var(--muted)'}}>Choose a song to start playing</div>
          </div>
        </div>
        <div className="mp-center">
          <div className="controls">
            <button className="icon-btn prev" aria-label="Previous" type="button" disabled>
              ⏮
            </button>
            <button
              className="play-btn neon"
              onClick={() => playlist && playlist.length > 0 && playTrack(playlist[0])}
              aria-label="Play first track"
              type="button"
              disabled={!playlist || playlist.length === 0}
            >
              <span className="vis">▶</span>
            </button>
            <button className="icon-btn next" aria-label="Next" type="button" disabled>
              ⏭
            </button>
          </div>
          <div className="progress-area">
            <div className="time left">0:00</div>
            <div className="progress-track" role="slider" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
              <div className="progress-fill" style={{ width: '0%' }} />
            </div>
            <div className="time right">0:00</div>
          </div>
        </div>
        <div className="mp-right">
          <div className="volume-control">
            <button className="icon-btn mute" aria-label="Mute/Unmute" type="button" disabled>
              🔈
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume || 0.7}
              onChange={handleVolumeChange}
              className="volume-slider"
              aria-label="Volume"
              disabled
            />
          </div>
          <button className="icon-btn more" aria-label="More" type="button" disabled>⋯</button>
        </div>
      </div>
    );
  }

  const { title = "Unknown", artist = "", cover = "", audio = "" } = currentTrack;
  const pct = duration ? Math.min(100, Math.round((currentTime / duration) * 100)) : 0;

  const handleProgressClick = (e) => {
    const progressTrack = e.target.closest('.progress-track');
    if (!progressTrack || !audioRef.current) return;
    const clickPosition = e.nativeEvent.offsetX / progressTrack.offsetWidth;
    const newTime = clickPosition * audioRef.current.duration;
    seekTo(newTime);
  };

  return (
    <div className={`music-player glassmorph ${contextPlaying ? "playing" : ""}`} role="region" aria-label="Music player">
      <audio ref={audioRef} preload="metadata" />
      <div className="mp-left">
        <div className="cover-wrap" aria-hidden={!cover}>
          {cover ? (
            <img src={cover} alt={`${title} cover`} className="cover" />
          ) : (
            <div className="cover fallback" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                <path d="M9 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="currentColor" />
                <path d="M9 11V3l10-1v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          )}
          <div className="cover-state-badge" aria-hidden="true">{contextPlaying ? "▮▮" : "▶"}</div>
        </div>
        <div className="meta">
          <div className="title" title={title}>{title}</div>
          <div className="artist" title={artist}>{artist}</div>
        </div>
      </div>
      <div className="mp-center" aria-hidden="false">
        <div className="controls">
          <button className="icon-btn prev" aria-label="Previous" type="button" onClick={() => prevTrack && prevTrack()}>
            ⏮
          </button>
          <button
            className="play-btn neon"
            onClick={togglePlayPause}
            aria-pressed={contextPlaying}
            aria-label={contextPlaying ? "Pause" : "Play"}
            type="button"
          >
            <span className="vis">{contextPlaying ? "▮▮" : "▶"}</span>
          </button>
          <button className="icon-btn next" aria-label="Next" type="button" onClick={() => nextTrack && nextTrack()}>
            ⏭
          </button>
        </div>
        <div className="progress-area" aria-hidden="false">
          <div className="time left">{formatTime(currentTime)}</div>
          <div className="progress-track" role="slider" aria-valuemin={0} aria-valuemax={Math.round(duration)} aria-valuenow={Math.round(currentTime)} onClick={handleProgressClick}>
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="time right">{formatTime(duration)}</div>
        </div>
        <div className={`visualizer ${contextPlaying ? "active" : ""}`} aria-hidden={!contextPlaying}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
      <div className="mp-right">
        <div className="volume-control">
          <button className="icon-btn mute" aria-label="Mute/Unmute" type="button" onClick={() => {
            if (!audioRef.current) return;
            audioRef.current.muted = !audioRef.current.muted;
          }}>
            🔈
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            aria-label="Volume"
          />
        </div>
        <button className="icon-btn more" aria-label="More" type="button">⋯</button>
      </div>
    </div>
  );
}