import styles from "./chatBody.module.css"

export function ChatBody({messagesData}){
  const username = localStorage.getItem('username')

    return (
        <div className={styles.container}>
           {messagesData.map(messageData => username === messageData.name 
             ?  <div className={styles["sent-message-container"]}>
                  <p className={styles["username-sent"]}>You</p>
                    <div className={styles["text-field-sent"]}>
                        <p className={styles.message}>
                          {messageData.text}
                        </p>
                    </div>
                </div>

             : <div className={styles["received-message-container"]}>
                  <p className={styles["username-received"]}>{messageData.name}</p>
                    <div className={styles["text-field-received"]}>
                      <p className={styles.message}>
                        {messageData.text}
                      </p>
                  </div>
               </div>
            )}
          <div className={styles["message-typing"]}>
          <p>Username is typing...</p>
        </div>
        </div>
        
        )
}