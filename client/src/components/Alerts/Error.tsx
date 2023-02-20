import styles from "./alerts.module.css"

type ErrorProps = {
    error : string
}
export const ErrorAlert = ({error}: ErrorProps) => {

    return (
    <div className={styles.alert + " " + styles.error}>
        <input type="checkbox" id="alert1" />
        <label className={styles.close} title="close" htmlFor="alert1">
            <i className="icon-remove" />
        </label>
         <p className={styles.inner}>
            <strong>Error!</strong> {error}!
         </p> 
    </div>
    )
}