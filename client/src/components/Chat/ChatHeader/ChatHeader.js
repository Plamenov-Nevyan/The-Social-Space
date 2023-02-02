import {useNavigate} from "react-router-dom"
import {useLocalStorage} from "../../../hooks/useLocalStorage"
import styles from "./chatHeader.module.css"

export function ChatHeader({socket}){
  const navigate = useNavigate()
  const {deleteSession} = useLocalStorage()
  const leaveHandler = () => {
      deleteSession()
      navigate('/')
     window.location.reload() 
  }

    return (
        <div className={styles.container}>
          <h2 className={styles.header}>Chat with friends and colleagues !</h2>
          <button className={styles["leave-btn"]} onClick={e => leaveHandler()}>LEAVE CHAT</button>
        </div>
        )
}