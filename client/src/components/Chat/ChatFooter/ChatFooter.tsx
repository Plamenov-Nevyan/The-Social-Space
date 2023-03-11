import {useState} from "react"
import {useLocalStorage} from "../../../hooks/useLocalStorage"
import styles from "./chatFooter.module.css"
import { Socket } from "socket.io-client";

type ChatFooterProps = {
  socket : Socket;
  onMessageChange : (message: string) => void;
  sendMessageHandler: () => void;
  currentMessage: string;
}

export function ChatFooter({socket, sendMessageHandler, onMessageChange, currentMessage}: ChatFooterProps){

  // const messageHandler = () => {
  //   let username = getFromStorage('firstName') + " " + getFromStorage('lastName')
  //   if(username){
  //          socket.emit('message', {
  //           text : message.trim(),
  //           name : username,
  //           id : `${socket.id}-${Math.random()}`,
  //           socketId : socket.id,
  //          })
  //   }
  //   setMessage('')
  // }

    return (
        <div className={styles.container}>
          <textarea 
          className={styles["message-input"]} 
          id="messageInput" 
          name="messageInput"
          placeholder="Type your message here..."
          value={currentMessage}
          onChange={e => onMessageChange(e.target.value)}
          ></textarea>
          <button 
          className={styles["send-btn"]}
          onClick={e => sendMessageHandler()}
          >
            SEND
            </button>
        </div>
        )
}