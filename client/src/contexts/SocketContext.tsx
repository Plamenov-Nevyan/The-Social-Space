import { createContext } from "react";
import socketIo, {Socket} from "socket.io-client"

const socket = socketIo('http://localhost:8000')

const SocketContext = createContext<Socket>(socket)

const SocketProvider = ({children}: any) => {
  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}

export {SocketContext, SocketProvider}