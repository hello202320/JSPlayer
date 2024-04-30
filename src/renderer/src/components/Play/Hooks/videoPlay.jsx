import { useEffect,useState } from "react";
export function useVideoPlay(videoRef){
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  
  function handlePlayPause() {
    const video = videoRef.current;
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    setIsPlaying(!video.paused);
}

    
useEffect(() => {
    const video = videoRef.current;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    
    return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('ended', handleEnded);
    };
}, [videoRef]);

  return {
      isPlaying,
      handlePlayPause,
      setIsPlaying,
      isVideoEnded,
      setIsVideoEnded
  };
}
