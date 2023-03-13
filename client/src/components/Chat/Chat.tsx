import {useEffect, useState, useContext} from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {sendMessage, getLastConvo} from "../../services/chatServices"
import styles from "./chat.module.css"
import {ChatBar} from "./ChatBar/ChatBar";
import {ChatBody} from "./ChatBody/ChatBody";
import {ChatFooter} from "./ChatFooter/ChatFooter";
import {ChatHeader} from "./ChatHeader/ChatHeader";
type UserProps = {
    firstName: string,
    lastName: string;
    age: string;
    nickname : string;
    interests: string[];
    description : string;
    email: string;
    _id: string;
}

type MessageDataProps = {
    receiver : UserProps,
    sender: UserProps,
    message: string,
    createdAt: string,
  }

  type CommunicationDataProps = {
    userOne: string;
    userTwo: string;
    transcript: MessageDataProps[] | [];
  } 


export function Chat(){
    const [messagesData, setMessagesData] = useState<CommunicationDataProps>({
        userOne: '',
        userTwo: '',
        transcript: []
    })
    const socket = useContext(SocketContext)
    const {getFromStorage} = useLocalStorage()
    const [selectedUser, setSelectedUser] = useState<string[]>([])
    const [message, setMessage] = useState('')
    useEffect(() => {
        socket.on('message', (receivedData) => {{console.log(receivedData); setMessagesData({...receivedData})}})
        
    }, [socket, messagesData])

    useEffect(() => {
     if(selectedUser.length === 0){return}
        getLastConvo(getFromStorage('id'), selectedUser[0])  
     .then(commData => {
        console.log(commData)
        setMessagesData({...commData})
    })
     .catch(err => console.log(err))
     
    }, [selectedUser])
 const onUserSelect = async (recipientId: string, recipientSocketId: string) => setSelectedUser([recipientId, recipientSocketId])

 const sendMessageHandler = async () => {
    // try{
    // let commData = await sendMessage({
    //     receiver : selectedUser[0],
    //     sender: getFromStorage('id'),
    //     message,
    //     createdAt: String(new Date()).split('T')[0].substring(4, 21),
    //     receiverSocketId: selectedUser[1]
    //   })
    //   setMessagesData({...commData})
    // }catch(err){
    //     console.log(err)
    // }
    socket.emit('saveMessage', ({
            receiver : selectedUser[0],
            sender: getFromStorage('id'),
            message,
            createdAt: String(new Date()).split('T')[0].substring(4, 21),
            receiverSocketId: selectedUser[1],
            senderSocketId: socket.id
          }))
 }

 const onMessageChange = (message: string) => setMessage(message)

    return(
        <div className={styles['chat-container']}>
            <ChatBar socket={socket} onUserSelect={onUserSelect} />
            <div className={styles['chat-main']}>
            <ChatHeader socket={socket} />
            { selectedUser.length !== 0
             ? <ChatBody messagesData={messagesData} userId={getFromStorage('id')}/>
             : <h1>Loading...</h1>
            }
            <ChatFooter socket={socket} sendMessageHandler={sendMessageHandler} onMessageChange={onMessageChange} currentMessage={message}/>
            </div>
        </div>
    )
}