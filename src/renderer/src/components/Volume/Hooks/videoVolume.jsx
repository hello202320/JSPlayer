import { useState} from "react";

export function useVideoVolume(initialVolume = 1) {
    const [volume, setVolume] = useState(initialVolume);
    const [originalVolume, setOriginalVolume] = useState(initialVolume);

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
    };

    const muteVolume = () => {
        if (volume !== 0) {
            setOriginalVolume(volume);
            setVolume(0); 
        } else {
            setVolume(originalVolume); 
        }
    };

    return { volume, handleVolumeChange, muteVolume };
}
