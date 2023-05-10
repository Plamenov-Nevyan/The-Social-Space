import { useState, useEffect } from "react"
import { useLocalStorage} from "../../../hooks/useLocalStorage"
import styles from "./chatBar.module.css"
import { Socket } from "socket.io-client";
import { UserProps, UnreadMsgList, UnreadTransformedList } from "../../../types";

type ChatBarProps = {
  socket : Socket
  onUserSelect: (recipientId: string, recipientSocketId:string) => void
  clearUserSelect: () => void
  currActiveUser: string
  userId: string
  newUnreadMessages: UnreadTransformedList
}

export function ChatBar({socket, onUserSelect, clearUserSelect, currActiveUser, userId, newUnreadMessages}: ChatBarProps){
  const [activeUsers, setActiveUsers] = useState<UserProps[]>([])
  const [currSelectedUser, setCurrSelectedUser] = useState('')
  const [listOfUnreadMsg, setListOfUnreadMsg] = useState<UnreadTransformedList>({})
  
  const {getFromStorage, getAllFromStorage} = useLocalStorage()
  let username = getFromStorage('nickname')
  useEffect(() => {
    setListOfUnreadMsg(oldList => {return {...oldList, ...newUnreadMessages}})
  }, [newUnreadMessages])
  useEffect(() => {
    socket.emit('userSignUp', {...getAllFromStorage(), socketId : socket.id})
  }, [])
  useEffect(() => {
    socket.on('sendListOfUsers', (users) => {
      console.log(users)
        setActiveUsers([...users])
    })
}, [socket, activeUsers])

useEffect(() => {
  socket.emit('getUnreadCount', userId)
},[socket, currSelectedUser])

useEffect(() => {
if(currSelectedUser === ''){return}
socket.emit('markAsRead', ({userId : getFromStorage('id'), selectedUserId: currSelectedUser}))
}, [currSelectedUser])

useEffect(() => {
  socket.on('saveUnreadCount', (list: UnreadMsgList) => {
    let transformedList: UnreadTransformedList = {
      
    }
    for (let i = 0; i < list.users.length; i++){
      for(let j = 0; j <= i; j++){
        transformedList[list.users[i]] = list.counts[j]
      }
    }
    setListOfUnreadMsg({...transformedList})
})
}, [])

  return (
  <div className={styles.container}>
    <div className={styles["header-container"]}>
    <h1 className={styles.header}>Chat App</h1>
    </div>
    <div className={styles.divider}></div>
    <h2 className={styles["active-users-header"]}>Active users:</h2>
    <div className={styles.divider}></div>
    <ul className={styles["users-list"]}>
      {activeUsers.length > 1
       ? activeUsers.map((user, index) => user.nickname !== username && <li 
       key={user.socketId} 
       className={currSelectedUser === user.id
        ? styles['user-active']
        : styles.user
      }
       id={`${user.id}/${user.socketId}`}
       onClick={(e) => {
        if(currSelectedUser === '') {
        setCurrSelectedUser(e.currentTarget.id.split('/')[0]) 
        onUserSelect(e.currentTarget.id.split('/')[0], e.currentTarget.id.split('/')[1])
        }else {
          setCurrSelectedUser('')
          clearUserSelect()
        }
       }}
       >
        {user.nickname}
        {Object.values(listOfUnreadMsg).length > 0
          ? listOfUnreadMsg.hasOwnProperty(user.id) && <span className={styles.badge_message}>{listOfUnreadMsg[user.id]}</span>
          : null
        }
       </li>
       )
       : <h3>No one is online at the moment...</h3>
      }
    </ul>
  </div>
  )
}
