import styles from "./chatBody.module.css"
import {useEffect, useContext, useState} from 'react'
import { SocketContext } from "../../../contexts/SocketContext"
import {MessageReceived} from "./MessageReceived"
import {MessageSent} from "./MessageSent"
import {CommsDataProps} from "../../../types"

// type UserProps = {
//   firstName: string,
//   lastName: string;
//   age: string;
//   nickname : string;
//   interests: string[];
//   description : string;
//   email: string;
//   _id: string
// }
// type MessageDataProps = {
//   receiver : UserProps,
//   sender: UserProps,
//   message: string,
//   createdAt: string,
// }
// type CommsDataProps = {
//   userOne: UserProps | {},
//   userTwo: UserProps | {},
//   transcript: MessageDataProps[] | []
// }
type ChatBodyProps = {
  messagesData : CommsDataProps,
  userId: string,
  selectedUser: string[]
}

export function ChatBody({messagesData, userId, selectedUser} : ChatBodyProps){
 const [isUserTyping, setIsUserTyping] = useState<boolean>(false)
  const socket = useContext(SocketContext)

  useEffect(() => {
    socket.on('userIsTyping', () => {
      setIsUserTyping(true)
    })
  }, [])

  useEffect(() => {
    socket.on('userStoppedTyping', () => {
      setIsUserTyping(false)
    })
  }, [])

  console.log(isUserTyping)

  return (

        <div className={styles.container}>
           {messagesData.transcript.length > 0 
            ? <> 
            {messagesData.transcript.map((messageData, index) => userId === messageData.sender._id
             ? <MessageSent
              key={index} 
              text={messageData.message} 
              />
             : <MessageReceived 
             key={index} 
             text={messageData.message} 
             name={messageData.sender.nickname} 
             />
            )}
            {isUserTyping && <div 
            className={styles["message-typing"]}
            >
              <p>Username is typing...</p>
            </div>}
            </>
            : selectedUser.length > 0
              ? <h1 className={styles["chat-welcome-header"]}>Be the first one to say hi !</h1>
              : <h1 className={styles["chat-welcome-header"]}>Select a user to chat with</h1>
          }  
        </div>
        
      
  )
}