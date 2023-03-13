import styles from "./chatFooter.module.css"

type ChatFooterProps = {
  onMessageChange : (message: string) => void;
  sendMessageHandler: () => void;
  currentMessage: string;
  activeUser: string[]
}

export function ChatFooter({sendMessageHandler, onMessageChange, currentMessage, activeUser}: ChatFooterProps){

    return (
        <div className={styles.container}>
          {activeUser.length > 0 && <>
           <textarea 
          className={styles["message-input"]} 
          id="messageInput" 
          name="messageInput"
          placeholder="Type your message here..."
          value={currentMessage}
          onChange={e => onMessageChange(e.target.value)}
          ></textarea>
          <button 
          className={styles["send-btn"]}
          onClick={e => sendMessageHandler()}
          >
            SEND
            </button>
            </>
            }
        </div>
        )
}