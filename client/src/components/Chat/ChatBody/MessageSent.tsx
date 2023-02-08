import styles from "./chatBody.module.css";

type SentMessagesProps = {
  text : string
}

export function MessageSent({text}: SentMessagesProps) {
  return (
    <div className={styles["sent-message-container"]}>
      <p className={styles["username-sent"]}>You</p>
      <div className={styles["text-field-sent"]}>
        <p className={styles.message}>{text}</p>
      </div>
    </div>
  );
}
