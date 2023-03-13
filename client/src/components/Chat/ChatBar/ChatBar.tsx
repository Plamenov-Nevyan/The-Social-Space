import { useState, useEffect } from "react"
import { useLocalStorage } from "../../../hooks/useLocalStorage"
import styles from "./chatBar.module.css"
import { Socket } from "socket.io-client";

type ChatBarProps = {
  socket : Socket
  onUserSelect: (recipientId: string, recipientSocketId:string) => void
}

type UserProps = {
  nickname: string,
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  accessToken: string;
  socketId : string;
}

export function ChatBar({socket, onUserSelect}: ChatBarProps){
  const [activeUsers, setActiveUsers] = useState<UserProps[]>([])
  const [currSelectedUser, setCurrSelectedUser] = useState('')
  const {getFromStorage} = useLocalStorage()
  let username = getFromStorage('nickname')
  useEffect(() => {
    socket.on('sendListOfUsers', (users) => {
        setActiveUsers([...users])
    })
}, [socket, activeUsers])

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
       ? activeUsers.map(user => user.nickname !== username && <li 
       key={user.socketId} 
       className={currSelectedUser === user.id
        ? styles['user-active']
        : styles.user
      }
       id={`${user.id}/${user.socketId}`}
       onClick={(e) => {
        setCurrSelectedUser(e.currentTarget.id.split('/')[0])
        onUserSelect(e.currentTarget.id.split('/')[0], e.currentTarget.id.split('/')[1])
       }}
       >
        {user.nickname}
       </li>
       )
       : <h3>No one is online at the moment...</h3>
      }
    </ul>
  </div>
  )
}