import { ReactNode } from "react"
import styles from "../home.module.css"

type FormWrapperProps = {
    title : string,
    children : ReactNode
}

export function FormWrapper({title, children} : FormWrapperProps) {
   return <>
     <h2 id={styles.form_title}>{title}</h2>
     <div id={styles.inputs_container} style={{
        gap : "1rem .5rem",
        gridTemplateColumns : 'auto minmax(auto, 400px)',
     }}>
        {children}
     </div>
   </>
}