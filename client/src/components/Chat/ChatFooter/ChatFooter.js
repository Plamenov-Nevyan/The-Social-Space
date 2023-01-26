import styles from "./chatFooter.module.css"

export function ChatFooter(){
    return (
        <div className={styles.container}>
          <textarea 
          className={styles["message-input"]} 
          id="messageInput" 
          name="messageInput"
          placeholder="Type your message here..."
          ></textarea>
          <button className={styles["send-btn"]}>SEND</button>
        </div>
        )
}