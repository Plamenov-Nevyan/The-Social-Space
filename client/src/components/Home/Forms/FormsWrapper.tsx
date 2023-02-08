import { ReactNode } from "react"

type FormWrapperProps = {
    title : string,
    children : ReactNode
}

export function FormWrapper({title, children} : FormWrapperProps) {
   return <>
     <h2 id="form_title">{title}</h2>
     <div id="inputs_container" style={{
        gap : "1rem .5rem",
        gridTemplateColumns : 'auto minmax(auto, 400px)',
     }}>
        {children}
     </div>
   </>
}