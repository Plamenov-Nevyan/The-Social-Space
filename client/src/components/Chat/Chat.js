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
 
    return(
        <div className={styles['chat-container']}>
            <ChatBar />
            <div className={styles['chat-main']}>
            <ChatHeader />
            <ChatBody messagesData={messagesData}/>
            <ChatFooter socket={socket}/>
            </div>
        </div>
    )
}