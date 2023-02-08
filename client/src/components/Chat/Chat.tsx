import {useEffect, useState, useContext} from "react";
import { SocketContext } from "../../contexts/SocketContext";
import styles from "./chat.module.css"
import {ChatBar} from "./ChatBar/ChatBar";
import {ChatBody} from "./ChatBody/ChatBody";
import {ChatFooter} from "./ChatFooter/ChatFooter";
import {ChatHeader} from "./ChatHeader/ChatHeader";

type MessageDataProps = {
    text : string,
    name : string,
    id : string,
    socketId : string,
  }

export function Chat(){
    const [messagesData, setMessagesData] = useState<MessageDataProps[]>([])
    const socket = useContext(SocketContext)
    useEffect(() => {
        socket.on('messageResponse', (receivedData) => {
            setMessagesData([...messagesData, receivedData])
        })
        
    }, [socket, messagesData])

    return(
        <div className={styles['chat-container']}>
            <ChatBar socket={socket} />
            <div className={styles['chat-main']}>
            <ChatHeader socket={socket} />
            <ChatBody messagesData={messagesData}/>
            <ChatFooter socket={socket}/>
            </div>
        </div>
    )
}