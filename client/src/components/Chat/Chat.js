import {useEffect, useState} from "react";
import styles from "./chat.module.css"
import {ChatBar} from "./ChatBar/ChatBar";
import {ChatBody} from "./ChatBody/ChatBody";
import {ChatFooter} from "./ChatFooter/ChatFooter";
import {ChatHeader} from "./ChatHeader/ChatHeader";


export function Chat({socket}){
    const [messagesData, setMessagesData] = useState([])
    useEffect(() => {
        socket.on('messageResponse', (receivedData) => {
            setMessagesData([...messagesData, receivedData])
        })
       
    }, [socket, messagesData])
    const [activeUsers, setActiveUsers] = useState([])

    useEffect(() => {
      socket.on('sendListOfUsers', (users) => {
          setActiveUsers([...users])
      })
  }, [socket, activeUsers])

    return(
        <div className={styles['chat-container']}>
            <ChatBar activeUsers={activeUsers} />
            <div className={styles['chat-main']}>
            <ChatHeader socket={socket} />
            <ChatBody messagesData={messagesData}/>
            <ChatFooter socket={socket}/>
            </div>
        </div>
    )
}