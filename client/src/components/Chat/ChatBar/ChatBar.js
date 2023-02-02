import { useState, useEffect } from "react"
import styles from "./chatBar.module.css"

export function ChatBar({socket}){
  const [activeUsers, setActiveUsers] = useState([])

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
      {activeUsers.length > 0
       ? activeUsers.map(user => <li key={user.socketId} className={styles.user}>{user.username}</li>)
       : <h3>No one is online at the moment...</h3>
      }
    </ul>
  </div>
  )
}