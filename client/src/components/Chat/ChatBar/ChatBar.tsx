import { useState, useEffect } from "react"
import { useLocalStorage } from "../../../hooks/useLocalStorage"
import styles from "./chatBar.module.css"
import { Socket } from "socket.io-client";

type ChatBarProps = {
  socket : Socket
}

export function ChatBar({socket}: ChatBarProps){
  const [activeUsers, setActiveUsers] = useState<object[]>([])
  const {getFromStorage} = useLocalStorage()
  let username = getFromStorage('username')

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
       ? activeUsers.map(user => user.username !== username && <li 
       key={user.socketId} 
       className={styles.user}
       >
        {user.username}
       </li>
       )
       : <h3>No one is online at the moment...</h3>
      }
    </ul>
  </div>
  )
}