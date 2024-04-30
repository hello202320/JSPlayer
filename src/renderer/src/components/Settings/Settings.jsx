import React, { useState } from 'react';
import { RxLoop } from "react-icons/rx";
export default function Settings({ isOpen, onClose, onSpeedChange, onLoopToggle, isLoopOn,   videoRef}) {
    const [speed, setSpeed] = useState(); // Default speed

    const handleSpeedChange = (newSpeed) => {
        setSpeed(newSpeed);
        onSpeedChange(newSpeed);
    };

  

    return (
        <div className='absolute bottom-12  right-0  z-50'>
            <div className="bg-black p-3 rounded-xl">
                <div className=''>
                    <label>Speed: </label>
                    <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500'
                    value={ videoRef.current.playbackRate} onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}>
                        <option value={0.25}>0.25x</option>
                        <option value={0.5}>0.5x</option>
                        <option value={1}>1x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2x</option>
                    </select>
                </div>
     
                    <div className="relative ">
                    {!isLoopOn && <div className="absolute bottom-2 left-0 w-5 h-0.5 bg-white  rotate-45 origin-right"></div>
}
                        <button className='text-xl' onClick={onLoopToggle}><RxLoop/></button>
                    </div>
                  
            
                
            </div>
        </div>
    );
}
