import {useNavigate} from "react-router-dom"
import {useLocalStorage} from "../../../hooks/useLocalStorage"
import styles from "./chatHeader.module.css"
import { Socket } from "socket.io-client";

type ChatHeaderProps = {
  socket : Socket
}

export function ChatHeader({socket}: ChatHeaderProps){
  const navigate = useNavigate()
  const {deleteSession} = useLocalStorage()
  const leaveHandler = () => {
      deleteSession()
      navigate('/')
     window.location.reload() 
  }

  const navToProfile = () => navigate('/my-profile')
  

    return (
        <div className={styles.container}>
          <h2 className={styles.header}>Chat with friends and colleagues !</h2>
          <button className={styles["my-profile-btn"]} onClick={e => navToProfile()}>MY PROFILE<i className="fa-solid fa-user"></i></button>
          <button className={styles["leave-btn"]} onClick={e => leaveHandler()}>LEAVE CHAT<i className="fa fa-sign-out" aria-hidden="true"></i></button>
        </div>
        )
}