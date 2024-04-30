export default function Slider({ currentTime,
    duration,
    handleSliderChange,
    handleSliderMouseDown,
    handleSliderMouseUp,
    formatTime}){
    return(
        <>
        <div className="text-white text-xs flex-none mr-1 ml-7">
                { formatTime(currentTime) }
                </div>
                <div className="mb-1.5 flex-1 w-full">
                    <input
                        className=" volume-slider w-full h-1 rounded-lg appearance-none range-sm dark:bg-gray-400 accent-gray-100"
                        type="range"
                    
                        min="0"
                        max={duration}
                        step="any"
                        value={currentTime}
                        onChange={handleSliderChange}
                    
                        onMouseDown={handleSliderMouseDown}
                        onMouseUp={handleSliderMouseUp}
                        style={{
                            background: `linear-gradient(to right, orange ${currentTime / duration * 100}%, #CBD5E0 ${currentTime / duration * 100}%)`
                            }}
                    />
                </div>
            
                <div className="text-white text-xs flex-none ml-1 mr-7">
                {formatTime(duration - currentTime) }
                </div>
        </>
    )
}