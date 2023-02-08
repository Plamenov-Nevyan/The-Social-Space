import {Route, Routes} from "react-router-dom";
import socketIo, {Socket} from "socket.io-client"
import {Chat} from "./components/Chat/Chat";
import {Home} from "./components/Home/Home";
let socket : Socket;
const ENDPOINT = "localhost:5000"
socket = socketIo(ENDPOINT)
// const socket: Socket<ClientToServerEvents> = socketIo()


function App() {  
  return (
  <Routes>
    <Route path="/" element={<Home socket={socket}/>} />
    <Route path="/chat" element={<Chat socket={socket} />} />
  </Routes>
  )
}

export default App;
