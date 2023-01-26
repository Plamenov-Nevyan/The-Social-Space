import styles from "./chatBody.module.css"

export function ChatBody(){
    return (
        <div className={styles.container}>
          <div className={styles["sent-message-container"]}>
          <p className={styles["username-sent"]}>You</p>
            <div className={styles["text-field-sent"]}>
            <p className={styles.message}>
               Hello !
            </p>
            </div>
          </div>
          <div className={styles["received-message-container"]}>
          <p className={styles["username-received"]}>Username</p>
             <div className={styles["text-field-received"]}>
                 <p className={styles.message}>
                    Hey, what's up!
                 </p>
             </div>
          </div>
          <div className={styles["sent-message-container"]}>
          <p className={styles["username-sent"]}>You</p>
            <div className={styles["text-field-sent"]}>
            <p className={styles.message}>
               Hello !  Hello ! Hello ! Hello ! Hello ! Hello ! Hello ! Hello ! Hello ! Hello ! Hello ! Hello ! Hello ! Hello !
            </p>
            </div>
          </div>
          <div className={styles["received-message-container"]}>
          <p className={styles["username-received"]}>Username</p>
             <div className={styles["text-field-received"]}>
                 <p className={styles.message}>
                   Are you fuckin crazy man ?????Are you fuckin crazy man ?????Are you fuckin crazy man ?????
                 </p>
             </div>
          </div>
          <div className={styles["sent-message-container"]}>
          <p className={styles["username-sent"]}>You</p>
            <div className={styles["text-field-sent"]}>
            <p className={styles.message}>
               Hello !  Hello ! Hello ! Hello ! Hello ! Hello ! Hello ! Hello ! Hello ! Hello ! Hello ! Hello ! Hello ! Hello !
            </p>
            </div>
          </div>
          <div className={styles["message-typing"]}>
          <p>Username is typing...</p>
        </div>
        </div>
        
        )
}