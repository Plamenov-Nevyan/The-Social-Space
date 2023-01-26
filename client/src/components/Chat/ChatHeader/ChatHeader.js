import {useNavigate} from "react-router-dom"
import {useLocalStorage} from "../../../hooks/useLocalStorage"
import styles from "./chatHeader.module.css"

export function ChatHeader(){
  const navigate = useNavigate()
  const {getFromStorage} = useLocalStorage
  const leaveHandler = () => {

  }

    return (
        <div className={styles.container}>
          <h2 className={styles.header}>Chat with friends and colleagues !</h2>
          <button className={styles["leave-btn"]}>LEAVE CHAT</button>
        </div>
        )
}