import { useState, useEffect } from "react"
import { useLocalStorage } from "../../../hooks/useLocalStorage"
import styles from "./chatBar.module.css"
import { Socket } from "socket.io-client";

type ChatBarProps = {
  socket : Socket
}

type UserProps = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  ZIP: string;
  email: string;
  password: string;
  socketId : string;
}

export function ChatBar({socket}: ChatBarProps){
  const [activeUsers, setActiveUsers] = useState<UserProps[]>([])
  const {getFromStorage} = useLocalStorage()
  let username = getFromStorage('firstName') + ' ' + getFromStorage('lastName')

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
       ? activeUsers.map(user => `${user.firstName} ${user.lastName}`!== username && <li 
       key={user.socketId} 
       className={styles.user}
       >
        {user.firstName + ' ' + user.lastName}
       </li>
       )
       : <h3>No one is online at the moment...</h3>
      }
    </ul>
  </div>
  )
}