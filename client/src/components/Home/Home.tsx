import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import { FormEvent, useState, useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { AccountForm } from "./Forms/AccountForm";
import { ProfileDataForm } from "./Forms/ProfileDataForm";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { PersonalInfo } from "./Forms/PersonalInfoForm";
import styles from "./home.module.css"

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  nickname : string;
  interests: string[];
  description : string;
  email: string;
  password: string;
};

let initialData: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  nickname: "",
  interests: [],
  description: "",
  email: "",
  password: "",
};


export function Home(){
    const navigate = useNavigate()
    const socket = useContext(SocketContext)
    const [data, setData] = useState(initialData);
    const {setToStorage} = useLocalStorage()
    console.log(data)
     
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
        <PersonalInfo {...data} updateFormState={updateFormState} />,
        <ProfileDataForm {...data} updateFormState={updateFormState} />,
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