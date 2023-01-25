import socketIo from "socket.io-client"
const socket = socketIo.connect('http://localhost:8000')
import './App.css';


function App() {
  return (
   <h1>Hi</h1>
  );
}

export default App;
