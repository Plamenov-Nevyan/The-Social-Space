import {useLocalStorage} from "../../../hooks/useLocalStorage"
import styles from "./chatBody.module.css"
import {MessageReceived} from "./MessageReceived"
import {MessageSent} from "./MessageSent"

export function ChatBody({messagesData}){
  const {getFromStorage} = useLocalStorage()
  const username = getFromStorage('username')
  console.log(username)

    return (
        <div className={styles.container}>
           {messagesData.map(messageData => username === messageData.name 
             ? <MessageSent key={messageData.id} text={messageData.text} />
             : <MessageReceived key={messageData.id} text={messageData.text} name={messageData.name} />
            )}
          <div className={styles["message-typing"]}>
          <p>Username is typing...</p>
        </div>
        </div>
        
        )
}