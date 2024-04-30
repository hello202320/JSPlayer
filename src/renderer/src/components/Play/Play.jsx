import { IoIosPlay } from "react-icons/io";
import { IoPause } from "react-icons/io5";
export default function Play({isPlaying,handlePlayPause, isVideoEnded}){
    return(
    <>
        <div className="">
        <button className='text-3xl' onClick={handlePlayPause}>
            {isVideoEnded ? <IoIosPlay /> : (isPlaying ? <IoPause /> : <IoIosPlay />)}  
            </button>
        </div>
    
    </>)
}