import React from "react";

import { useMusic } from "../contexts/MusicContext";

import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, VolumeX } from 'lucide-react';

import "./MusicPlayer.css";
export default function MusicPlayer() {
    const music = useMusic();

    const {
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        formatTime,
        volume,
        togglePlayPause,
        nextTrack,
        prevTrack,
        seekTo,
        setVolumeLevel,
    } = music || {};

    if (!music || !currentTrack) {
        return (
            <div className="music-player glassmorph" role="region" aria-label="Music player">
                <div className="mp-left">
                    <div className="cover-wrap">
                        <div className="cover fallback">
                            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M9 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="currentColor" /><path d="M9 11V3l10-1v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                        </div>
                    </div>
                    <div className="meta">
                        <div className="title" style={{color: 'var(--muted)'}}>No track selected</div>
                        <div className="artist" style={{color: 'var(--muted)'}}>Choose a song to play</div>
                    </div>
                </div>
            </div>
        );
    }

    const { title = "Unknown Title", artist = { stageName: "Unknown Artist" }, album = {} } = currentTrack;
    const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

    const handleSeek = (e) => {
        const progressTrack = e.currentTarget;
        const clickPosition = e.nativeEvent.offsetX;
        const progressBarWidth = progressTrack.offsetWidth;
        const seekTime = (clickPosition / progressBarWidth) * duration;
        seekTo(seekTime);
    };

    const handleVolumeChange = (e) => {
        setVolumeLevel(parseFloat(e.target.value));
    };

    return (
        <div className={`music-player glassmorph ${isPlaying ? "playing" : ""}`} role="region" aria-label="Music player">
            <div className="mp-left">
                <div className="cover-wrap">
                    {album?.coverUrl ? (
                        <img src={album.coverUrl} alt={`${title} cover`} className="cover" />
                    ) : (
                        <div className="cover fallback">
                             <svg viewBox="0 0 24 24" width="20" height="20"><path d="M9 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="currentColor" /><path d="M9 11V3l10-1v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                        </div>
                    )}
                    <div className="cover-state-badge">{isPlaying ? "▮▮" : "▶"}</div>
                </div>
                <div className="meta">
                    <div className="title" title={title}>{title}</div>
                    <div className="artist" title={artist.stageName}>{artist.stageName}</div>
                </div>
            </div>

            <div className="mp-center">
                <div className="controls">
                    <button className="icon-btn prev" aria-label="Previous" type="button" onClick={prevTrack}>
                        ⏮
                    </button>
                    <button
                        className="play-btn neon"
                        onClick={togglePlayPause}
                        aria-pressed={isPlaying}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        type="button"
                    >
                        <span className="vis">{isPlaying ? "▮▮" : "▶"}</span>
                    </button>
                    <button className="icon-btn next" aria-label="Next" type="button" onClick={nextTrack}>
                        ⏭
                    </button>
                </div>
                <div className="progress-area">
                    <div className="time left">{formatTime(currentTime)}</div>
                    <div className="progress-track" onClick={handleSeek}>
                        <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
                    </div>
                    <div className="time right">{formatTime(duration)}</div>
                </div>
            </div>

            <div className="mp-right">
                <div className="volume-control">
                    <button className="icon-btn mute" aria-label="Mute/Unmute" type="button">
                        🔈
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
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