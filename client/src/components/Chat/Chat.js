import styles from "./chat.module.css"
import {ChatBar} from "./ChatBar/ChatBar";
import {ChatBody} from "./ChatBody/ChatBody";
import {ChatFooter} from "./ChatFooter/ChatFooter";
import {ChatHeader} from "./ChatHeader/ChatHeader";


export function Chat(){
    return(
        <div className={styles['chat-container']}>
            <ChatBar />
            <div className={styles['chat-main']}>
            <ChatHeader />
            <ChatBody />
            <ChatFooter />
            </div>
        </div>
    )
}