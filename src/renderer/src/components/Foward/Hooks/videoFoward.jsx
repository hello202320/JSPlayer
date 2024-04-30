import { useEffect,useState } from "react";

export  function useVideoFoward(videoRef, currentTime, duration){
    function handleFastForward  () {
        if (videoRef.current) {
            const newTime = currentTime + 5;
            videoRef.current.currentTime = newTime < duration ? newTime : duration;
        }
    };

    function handleBackward ()  {
        if (videoRef.current) {
            const newTime = currentTime - 5;
            videoRef.current.currentTime = newTime > 0 ? newTime : 0;
        }
    };

    return {handleBackward, handleFastForward};
}