
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";

export default function Volume({isMuted,muteVolume,volume,handleVolumeChange}){
    return(
        <>
            <button className='text-xl' onClick={muteVolume}>
                        {isMuted ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
            </button>
            <input
                className=" invisible group-hover:visible w-20 h-1 rounded-lg appearance-none  range-sm dark:bg-gray-400 accent-gray-100"
                type="range"
                min="0"
                max="1"
                step="any"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            />
        </>
    )
}