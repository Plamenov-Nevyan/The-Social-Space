import {useNavigate} from "react-router-dom";
import { FormEvent, useState, useContext} from "react";
import { AccountForm } from "./Forms/AccountForm";
import { ProfileDataForm } from "./Forms/ProfileDataForm";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { PersonalInfo } from "./Forms/PersonalInfoForm";
import styles from "./home.module.css"
import { LoginForm } from "./Forms/LoginForm";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ErrorAlert } from "../Alerts/Error";
import { registerUser, loginUser } from "../../services/authServices";

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
  const {setToStorage} = useLocalStorage()
    const navigate = useNavigate()
    const [data, setData] = useState(initialData);
    const [loginOrRegister, setLoginOrRegister] = useState('register')
    const [error, setError] = useState('')
    
    const submitHandler = async (e:FormEvent) => {
       e.preventDefault()
       try{
       let newUserData =  loginOrRegister === 'register' ? await registerUser(data) : await loginUser({email:data.email, password: data.password})
       setToStorage(newUserData)
       navigate('/chat')
       }catch(err){
        setError(err.message)
       }
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
      <>
      {error !== '' && <ErrorAlert error={error} />}
      <div id={styles.container}>
        <div className={styles['choises-container']}>
          <h2 className={
            loginOrRegister === 'login'
            ? styles["action-chooser-active"]
            : styles["action-chooser"]
          }
          onClick={(e) => setLoginOrRegister('login')}
          >
            Login
            </h2>
          <div className={styles.divider}></div>
          <h2 
          className={
            loginOrRegister === 'register'
            ? styles["action-chooser-active"]
            : styles["action-chooser"]
          }
          onClick={(e) => setLoginOrRegister('register')}
          >
            Register
            </h2>
        </div>
        { loginOrRegister === 'register'
       ? <form onSubmit={
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
    : <form onSubmit={submitHandler}>
      <LoginForm email={data.email} password={data.password} updateFormState={updateFormState}/>
    </form>
    }
    </div>
    </>
  );
}