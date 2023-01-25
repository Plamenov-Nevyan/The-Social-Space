import {Route, Routes} from "react-router-dom";
import socketIo from "socket.io-client"
import {Home} from "./components/Home/Home";
const socket = socketIo.connect('http://localhost:8000')


function App() {
  return (
  <div>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
  </div>
  )
}

export default App;
