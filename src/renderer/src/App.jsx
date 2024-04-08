import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

import { useEffect,useState } from 'react';
function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')
//   window.electron.ipcRenderer.on('ready', () => {
//     console.log(process.argv[1]);
// });
const [file, setFile] = useState('')
useEffect(() => {
  // Listen for command line arguments from the main process
  window.electron.ipcRenderer.on('command-line-args', (event, args) => {
    console.log(args[1]);
    setFile(args[1])
  });

  // Clean up event listeners
  return () => {
    window.electron.ipcRenderer.removeAllListeners('command-line-args');
  };
}, []);
  return (
    <>
      {file}
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App

