import {Route, Routes} from "react-router-dom";
import { SocketProvider } from "./contexts/SocketContext";
import {Chat} from "./components/Chat/Chat";
import {Home} from "./components/Home/Home";


function App() {  
  return (
  <SocketProvider>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/chat" element={<Chat />} />
  </Routes>
  </SocketProvider>
  )
}

export default App;
