import styles from "./chatBar.module.css"

export function ChatBar(){
  return (
  <div className={styles.container}>
    <div className={styles["header-container"]}>
    <h1 className={styles.header}>Chat App</h1>
    </div>
    <div className={styles.divider}></div>
    <h2 className={styles["active-users-header"]}>Active users:</h2>
    <div className={styles.divider}></div>
    <ul className={styles["users-list"]}>
      <li className={styles.user}>User 1</li>
      <li className={styles.user}>User 2</li>
      <li className={styles.user}>User 3</li>
      <li className={styles.user}>User 4</li>
      <li className={styles.user}>User 5</li>
      <li className={styles.user}>User 6</li>
      <li className={styles.user}>User 7</li>
    </ul>
  </div>
  )
}