import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import { FormEvent, useState, useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { AccountForm } from "./Forms/AccountForm";
import { AdressForm } from "./Forms/AdressForm";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { UserForm } from "./Forms/UserForm";
import styles from "./home.module.css"

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  ZIP: string;
  email: string;
  password: string;
};

let initialData: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  ZIP: "",
  email: "",
  password: "",
};


export function Home(){
    const navigate = useNavigate()
    const socket = useContext(SocketContext)
    const [data, setData] = useState(initialData);
    const {setToStorage} = useLocalStorage()
     
    const submitHandler = (e:FormEvent) => {
       e.preventDefault()
       setToStorage(data)
       socket.emit('userSignUp', {...data, socketId : socket.id})
       navigate('/chat')
    }

    function updateFormState(fields: Partial<FormData>) {
        setData((prevData) => {
          return {
            ...prevData,
            ...fields,
          };
        });
      }

      const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        nextStep,
        previousStep,
      } = useMultistepForm([
        <UserForm {...data} updateFormState={updateFormState} />,
        <AdressForm {...data} updateFormState={updateFormState} />,
        <AccountForm {...data} updateFormState={updateFormState} />,
      ]);

      
  const moveThroughForm = (e: FormEvent) => {
    e.preventDefault();
    nextStep()
  };

    return (
        <div id={styles.container}>
      <form onSubmit={
        isLastStep 
        ? submitHandler
        : moveThroughForm
        }>
      <div className={styles["progress-bar"]}>
        <div style={{width : isFirstStep ? '30%' : isLastStep ?'100%' : '60%'}}></div>
      </div>
        <div id={styles.steps_handler}>
          {currentStepIndex + 1} / {steps.length}
        </div>

        {step}

        <div id={styles.buttons_container}>
          {!isFirstStep && (
            <button type="button" onClick={previousStep}>
              Previous
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
      </form>
    </div>
  );
}