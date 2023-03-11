import styles from "./chatBody.module.css"
import {useState} from 'react'
import {MessageReceived} from "./MessageReceived"
import {MessageSent} from "./MessageSent"
type UserProps = {
  firstName: string,
  lastName: string;
  age: string;
  nickname : string;
  interests: string[];
  description : string;
  email: string;
  _id: string
}
type MessageDataProps = {
  receiver : UserProps,
  sender: UserProps,
  message: string,
  createdAt: string,
}
type CommsDataProps = {
  userOne: UserProps | {},
  userTwo: UserProps | {},
  transcript: MessageDataProps[] | []
}
type ChatBodyProps = {
  messagesData : CommsDataProps,
  userId: string,
}

export function ChatBody({messagesData, userId} : ChatBodyProps){
  console.log(messagesData)
  return (

        <div className={styles.container}>
           {messagesData.transcript.map((messageData, index) => userId === messageData.sender._id
             ? <MessageSent key={index} text={messageData.message} />
             : <MessageReceived key={index} text={messageData.message} name={messageData.sender.nickname} 
             />
            )}
          <div className={styles["message-typing"]}>
          <p>Username is typing...</p>
        </div>
        </div>
        
      
  )
}