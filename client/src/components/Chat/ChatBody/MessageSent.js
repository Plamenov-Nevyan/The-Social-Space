import styles from "./chatBody.module.css";

export function MessageSent({text}) {
  return (
    <div className={styles["sent-message-container"]}>
      <p className={styles["username-sent"]}>You</p>
      <div className={styles["text-field-sent"]}>
        <p className={styles.message}>{text}</p>
      </div>
    </div>
  );
}
