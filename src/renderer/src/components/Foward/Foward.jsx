// import { IoPlayForwardSharp } from "react-icons/io5";
// import { IoPlayBackSharp } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { IoPlaySkipBack } from "react-icons/io5";
export function PlayFoward({foward}){
    return(
        <div className="">
        <button className="text-xl ml-4 mr-2" onClick={foward}>
         <IoPlaySkipForward />
        </button>
       
    </div>
    )

}


export function PlayBackward({backward}){
    return(
        <div className="">
        <button className="text-xl mr-4 " onClick={backward}>
            < IoPlaySkipBack />
        </button>
       
    </div>
    )

}