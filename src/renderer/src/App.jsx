import {useState,useEffect} from 'react'
import VideoPlayer from './components/VideoPlayer'
function App() {
  
const [file, setFile] = useState('')
const [home, setHome] = useState(false)
useEffect(() => {
  window.electron.ipcRenderer.on('command-line-args', (event, args) => {
    setFile(args[1])
  });
  // const videoSource = file ? file:  'c:\\Users\\Sugoi Dekai\\OneDrive\\Desktop\\stuff_v1\\stuff_11\\videos\\i20.mp4';
  // setFile(videoSource)

  //test
  return () => {
    window.electron.ipcRenderer.removeAllListeners('command-line-args');
  };
}, []);

  return (
    <>
      
        <VideoPlayer home={home} setHome={setHome} source = {file} setF={setFile}/>
     
     


    </>
  )
}

export default App

