import styles from "./chatBody.module.css";

type ReceivedMessagesProps = {
  name : string,
  text : string
}

export function MessageReceived({name, text}: ReceivedMessagesProps) {
  return (
    <div className={styles["received-message-container"]}>
      <p className={styles["username-received"]}>{name}</p>
      <div className={styles["text-field-received"]}>
        <p className={styles.message}>{text}</p>
      </div>
    </div>
  );
}
