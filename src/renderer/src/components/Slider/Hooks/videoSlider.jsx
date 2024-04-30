import { useState } from 'react';

export function useVideoSlider(videoRef, setIsPlaying) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function handleTimeUpdate() {
    setCurrentTime(videoRef.current.currentTime);
  }

  function handleLoadedMetadata() {
    setDuration(videoRef.current.duration);
  }

  function handleSliderChange(e) {
    videoRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  }

  function handleSliderMouseDown() {
    videoRef.current.pause();
    setIsPlaying(false); 
  }

  function handleSliderMouseUp() {
    videoRef.current.play();
    setIsPlaying(true); 
  }

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return {
    currentTime,
    duration,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleSliderChange,
    handleSliderMouseDown,
    handleSliderMouseUp,
    formatTime,
  };
}
