import {useEffect, useState} from "react";
import styles from "./chat.module.css"
import {ChatBar} from "./ChatBar/ChatBar";
import {ChatBody} from "./ChatBody/ChatBody";
import {ChatFooter} from "./ChatFooter/ChatFooter";
import {ChatHeader} from "./ChatHeader/ChatHeader";
import { Socket } from "socket.io-client";

type ChatProps = {
    socket : Socket
}

export function Chat({socket}: ChatProps){
    const [messagesData, setMessagesData] = useState<object[]>([])
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