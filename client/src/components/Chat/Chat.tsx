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
    read: boolean
  }

  type SocketDataProps = [
     CommunicationDataProps,
     string // sender id
  ]

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
    const [error, setError] = useState('')
    const [unreadMessages, setUnreadMessages] = useState(0)
    useEffect(() => {
        socket.on('message', (receivedData: SocketDataProps) => {{
            console.log(selectedUser)
            console.log(receivedData[1])
            if(selectedUser.length !== 0 && receivedData[1] === selectedUser[0]){
                setMessagesData({...receivedData[0]})
            }
            else{setMessagesData({userOne: '', userTwo: '', transcript: []})}
        }}
        )
    }, [socket])

    useEffect(() => {
        socket.on('updateCommData', (receivedData) => {{
            setMessagesData({...receivedData})
        }}
        )
    }, [socket])

    useEffect(() => {
        socket.on('messageError', (err) => {{
            setError(err.message)
        }}
        )
    }, [socket])

    useEffect(() => {
     if(selectedUser.length === 0){return}
        getLastConvo(getFromStorage('id'), selectedUser[0])  
     .then(commData => {
        if(commData.notExisting){return}
        setMessagesData({...commData})
    })
     .catch(err => console.log(err))
     
    }, [selectedUser])
 const onUserSelect = (recipientId: string, recipientSocketId: string) => setSelectedUser([recipientId, recipientSocketId])
 const clearUserSelect = () => {
    setMessagesData({userOne: '', userTwo: '', transcript: []})
    setSelectedUser(oldSelection => [])
}

 const sendMessageHandler = async () => {
    socket.emit('saveMessage', ({
            receiver : selectedUser[0],
            sender: getFromStorage('id'),
            message,
            createdAt: String(new Date()).split('T')[0].substring(4, 21),
            receiverSocketId: selectedUser[1],
            senderSocketId: socket.id,
            read: false
          }))
    setMessage('')
 }

 const onMessageChange = (message: string) => setMessage(message)

    return(
        <div className={styles['chat-container']}>
            <ChatBar 
            socket={socket} 
            onUserSelect={onUserSelect} 
            clearUserSelect={clearUserSelect} 
            currActiveUser={selectedUser[0]}
            />
            <div className={styles['chat-main']}>
            <ChatHeader socket={socket} />
            <ChatBody messagesData={messagesData} userId={getFromStorage('id')} selectedUser={selectedUser}/>
            <ChatFooter 
            sendMessageHandler={sendMessageHandler} 
            onMessageChange={onMessageChange} 
            currentMessage={message}
            activeUser={selectedUser}
            />
            </div>
        </div>
    )
}