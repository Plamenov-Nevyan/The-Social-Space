import styles from "./chatBody.module.css";

export function MessageReceived({name, text}) {
  return (
    <div className={styles["received-message-container"]}>
      <p className={styles["username-received"]}>{name}</p>
      <div className={styles["text-field-received"]}>
        <p className={styles.message}>{text}</p>
      </div>
    </div>
  );
}
