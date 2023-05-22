import styles from "./chatFooter.module.css"
import { useContext, useEffect } from "react"
import {SocketContext} from "../../../contexts/SocketContext"

type ChatFooterProps = {
  onMessageChange : (message: string) => void;
  sendMessageHandler: () => void;
  currentMessage: string;
  activeUser: string[]
}

export function ChatFooter({sendMessageHandler, onMessageChange, currentMessage, activeUser}: ChatFooterProps){
  const socket = useContext(SocketContext)

  const onFocusText = () => {
    socket.emit('iAmTyping', (activeUser[1]))
  }

  const onUnfocusText = () => {
    socket.emit('iStoppedTyping', (activeUser[1]))
  }
 
    return (
        <div className={styles.container}>
          {activeUser.length > 0 && <>
           <textarea 
          className={styles["message-input"]} 
          id="messageInput" 
          name="messageInput"
          placeholder="Type your message here..."
          value={currentMessage}
          onChange={e => onMessageChange(e.target.value)}
          onFocus={() => onFocusText()}
          onBlur={() => onUnfocusText()}
          ></textarea>
          <button 
          className={styles["send-btn"]}
          onClick={e => sendMessageHandler()}
          >
            SEND
            </button>
            </>
            }
        </div>
        )
}