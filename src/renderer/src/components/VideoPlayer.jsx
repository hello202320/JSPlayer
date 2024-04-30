
import { useVideoSlider } from "./Slider/Hooks/videoSlider";
import { useVideoVolume } from "./Volume/Hooks/videoVolume";
import { useVideoPlay } from "./Play/Hooks/videoPlay";
import {useVideoFoward} from "./Foward/Hooks/videoFoward";
import { useEffect, useRef, useState } from "react";
import Volume from './Volume/Volume';
import Slider from "./Slider/Slider";
import Play from "./Play/Play";
import { PlayBackward, PlayFoward} from "./Foward/Foward";
import Settings from "./Settings/Settings";
import { IoMdSettings } from "react-icons/io";
import srtParser2 from "srt-parser-2";
import '../assets/base.css'
import { BsFillBadgeCcFill } from "react-icons/bs";

import { FaFolder } from "react-icons/fa";
export default function VideoPlayer({ source, home, setHome,setF }) {
    const [cc,setCC] = useState([])
    const fileInputRef = useRef(null);
    const [words, setWords] = useState()
    const [isHiVisible, setIsHiVisible] = useState(false);
    const [showCC, setShowCC] = useState(false);
    const [fileName, setFileName] = useState('');
    const [show, setShow] = useState(false)
    const ccTimeoutRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false);
    const [speed, setSpeed] = useState();
    const [hover, setHover] = useState()
    // const [s, setS] = useState()
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const handleMouseEnter = () => {
                setIsHovered(true);
                setShow(true);
                clearTimeout(ccTimeoutRef.current);
            };
            
            // const handleMouseLeave = (event) => {
            //     if (
            //         !event.relatedTarget ||
            //         (event.relatedTarget !== fileInputRef2.current &&
            //             !fileInputRef2.current.contains(event.relatedTarget))
            //     ) {
            //         if (!hover && !show) {
            //             setIsHovered(false);
            //             ccTimeoutRef.current = setTimeout(() => {
            //                 setShow(false);
            //             });
            //         }
            //     }
            // };

            //needs to pop dummy div to touch hover div like with cc pop up 
            //file select in order to work.
            
            const handleMouseMove = () => {
                setShow(true); 
                //setShowCC(true);
                if (!hover){
                clearTimeout(ccTimeoutRef.current);
                ccTimeoutRef.current = setTimeout(() => {
                    //setShowCC(false);
                    setShow(false); 
                }, 4000);
            }
            };

            video.addEventListener('mousemove', handleMouseMove);
            video.addEventListener('mouseenter', handleMouseEnter);
            // video.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                video.removeEventListener('mouseenter', handleMouseEnter);
                // video.removeEventListener('mouseleave', handleMouseLeave);
                video.removeEventListener('mousemove', handleMouseMove);
                clearTimeout(ccTimeoutRef.current);
            };
        }
    }, [hover]);

    const toggleCC = () => {
        setShowCC(!showCC);
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
          const srt_data = e.target.result;
          const parser = new srtParser2();
          const srt_array = parser.fromSrt(srt_data);
          setCC(srt_array)
          toggleCC()
        };
        reader.readAsText(file);
    
      };


    const videoRef = useRef(null);
    const modalRef = useRef(null);
    const { volume, handleVolumeChange, muteVolume } = useVideoVolume(0.10);
    const isMuted = volume === 0;


    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [volume]);

    const { isPlaying, handlePlayPause, setIsPlaying, isVideoEnded, setIsVideoEnded } = useVideoPlay(videoRef);

    const {
        currentTime,
        duration,
        handleTimeUpdate,
        handleLoadedMetadata,
        handleSliderChange,
        handleSliderMouseDown,
        handleSliderMouseUp,
        formatTime,
    } = useVideoSlider(videoRef, setIsPlaying);

    const {
        handleFastForward,
        handleBackward 
    } = useVideoFoward(videoRef, currentTime, duration);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const [isLoopOn, setIsLoopOn] = useState()
    const handleSpeedChange = (newSpeed) => {
      //  setSpeed(newSpeed);
        if (videoRef.current) {
            videoRef.current.playbackRate = newSpeed;
        }
    };

   
    const handleLoopToggle = () => {
        if (videoRef.current) {
            const newLoopState = !videoRef.current.loop;
            videoRef.current.loop = newLoopState;
            setIsLoopOn(newLoopState);
        }
        
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsSettingsOpen(false);
            }
        }
        if (isSettingsOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSettingsOpen]);
    const renderSubtitles = () => {

        if (cc.length === 0) {
            setWords(''); 
            return;
        }
        const currentSubtitle = cc.find(subtitle => {
            return currentTime >= subtitle.startSeconds && currentTime <= subtitle.endSeconds;
        });
        if (currentSubtitle) {
            setWords(currentSubtitle.text);
        } else {
            setWords(''); 
        }
    };
    useEffect(()=>{
        renderSubtitles();
       
    },[currentTime]

)

const fileInputRef2 = useRef(null);

// const handleIconClick = () => {

//   fileInputRef2.current.click();
// };
const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        source = file.path;
        setF(file.path);
        //console.log(file.path);
        event.target.value = null;
    }
  };



    return (
        <>
            <div className="w-screen h-screen relative">
                <video className='absolute bg-black w-full h-screen object-fill ' autoPlay src={source} ref={videoRef}
                    onEnded={() => { setCurrentTime(0); setIsPlaying(false); }}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                ></video>
                {showCC &&(
                            <div className=" w-full text-white absolute bottom-40"   >
                                <div className="text-3xl flex justify-center
                                ">
                                    <span className="outline-title" data-content={words}> {words}</span>
                                </div>
                                  
                           </div>
                       
                    )}
                {show && (
                <div className="absolute bottom-0 left-0 text-white flex-col cc bg-black pt-10 bg-opacity-50"  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    
          
                    <div className="flex flex-row items-center w-screen"  >
                        <Slider currentTime={currentTime} duration={duration} handleSliderChange={handleSliderChange} handleSliderMouseDown={handleSliderMouseDown}
                            handleSliderMouseUp={handleSliderMouseUp}
                            formatTime={formatTime} />
                    </div>

                    {/* controls */}
                    <div className="grid grid-cols-3 gap-4 mt-1 items-center z-0 pb-4">

                        <div className="flex items-center ml-7">
                            <div className="flex items-center">
                                <PlayBackward backward={handleBackward}/>
                                <Play isPlaying={isPlaying} handlePlayPause={handlePlayPause} isVideoEnded={isVideoEnded} />
                                <PlayFoward foward={handleFastForward}/>
                            </div>
                            <div className=" group mb-1 flex flex-row items-center rounded-3xl hover:bg-black p-2 pr-5 w-fit ">
                                <Volume isMuted={isMuted} muteVolume={muteVolume} volume={volume} handleVolumeChange={handleVolumeChange}  />
                            </div>

                        </div>
                        <div className=""></div>
                        <div className='ml-auto mr-6 flex items-center'>
                            <div className="relative mr-2">
                                <div
                                    className="text-2xl"
                                    onMouseEnter={() => setIsHiVisible(true)}
                                    onMouseLeave={() => setIsHiVisible(false)}
                                    onClick={() => setIsHiVisible(!isHiVisible)}
                                >   
                                    <BsFillBadgeCcFill />
                                </div>
                                {isHiVisible && (
                                    <div className="absolute bottom-5 right-0 bg-black p-3 rounded-xl  w-40"   onMouseEnter={() => setIsHiVisible(true)} onMouseLeave={() => setIsHiVisible(false)}>
                                         <div className="text-gray-300">Subtitles</div>
                                        <div className={` p-1.5 pt-2 pb-2 rounded-md ${showCC || cc.length != 0  && 'bg-gray-500'}`}>
                                           
                                            <button className="w-full flex items-center bg-gray-600 rounded-md "
                                                onClick={toggleCC}
                                            >
                                                <div className="h-5rounded-xl mt-0.5 mr-3">
                                                        
                                                </div>  
                                                <div className="">Off </div>
                                            </button>
                                            
                                        </div>
                                        {cc.length != 0  && (
                                             <div className={` p-1.5 pt-2 pb-2 rounded-md ${showCC && cc.length != 0 && 'bg-gray-500'}`}>
                                           
                                             <button className="w-full flex items-center bg-gray-600 rounded-md "
                                                 onClick={toggleCC}
                                             >
                                                 <div className="h-5  rounded-xl mt-0.5 mr-3">
                                                         
                                                 </div>  
                                                 <div className="">{fileName}</div>
                                             </button>
                                             
                                         </div>
                                        )}
                                        <div>
                                                <input
                                                type="file"
                                                accept=".srt"
                                                onChange={handleFileChange}
                                                style={{ display: 'none' }} // Hide the input element
                                                ref={fileInputRef}
                                                />
                                                <button onClick={() => fileInputRef.current.click()}>Open .srt File</button>
                                            </div>
                                    </div>
                                )}
                                </div>
                            <div className="flex flex-col-reverse z-50 " ref={modalRef}   onMouseEnter={() => setIsSettingsOpen(true)}
                                    onMouseLeave={() => setIsSettingsOpen(false)}>
                          
                                <button className='text-2xl'onClick={() => setIsSettingsOpen(!isSettingsOpen)}><IoMdSettings /></button>
                                {isSettingsOpen && (
                                    <Settings
                                        
                                        isLoopOn={isLoopOn}
                                        onClose={() => setIsSettingsOpen(false)}
                                        onSpeedChange={handleSpeedChange}
                                        onLoopToggle={handleLoopToggle}
                                        videoRef={videoRef}
                                    />
                                )} 
                            </div>
                            <div>
                          <div className="text-xl ml-2" onClick={() => fileInputRef2.current.click()} >
                            <FaFolder />
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef2} 
                                style={{ display: 'none' }} 
                                onInputCapture={handleFileSelect} 
                                
                            />
                            </div>
                        </div>

                    </div>


                </div>
                )}
            </div>
        </>
    )
}