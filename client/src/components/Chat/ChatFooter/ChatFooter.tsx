import {useState} from "react"
import {useLocalStorage} from "../../../hooks/useLocalStorage"
import styles from "./chatFooter.module.css"

export function ChatFooter({socket}){
  const [message, setMessage] = useState('')
  const {getFromStorage} = useLocalStorage()

  const messageHandler = () => {
    let username = getFromStorage('username')
    if(username){
           socket.emit('message', {
            text : message.trim(),
            name : username,
            id : `${socket.id}-${Math.random()}`,
            socketId : socket.id,
           })
    }
    setMessage('')
  }

    return (
        <div className={styles.container}>
          <textarea 
          className={styles["message-input"]} 
          id="messageInput" 
          name="messageInput"
          placeholder="Type your message here..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          ></textarea>
          <button 
          className={styles["send-btn"]}
          onClick={e => messageHandler()}
          >
            SEND
            </button>
        </div>
        )
}