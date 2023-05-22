import { FormWrapper } from "./FormsWrapper";
import styles from "../home.module.css"

type AccountData = {
    email: string;
    password: string;
  };
  type AccountFormProps = AccountData & {
    updateFormState: (fields: Partial<AccountData>) => void;
  };

export function LoginForm({email, password, updateFormState}: AccountFormProps){
    return (
        <FormWrapper title="Enter your account">
          <label>Email</label>
          <input
            autoFocus
            required
            type="text"
            value={email}
            onChange={(e) =>
              updateFormState({
                email: e.target.value,
              })
            }
          />
          <label>Password</label>
          <input 
          required 
          type="password" 
          onChange={(e) =>
            updateFormState({
              password: e.target.value,
            })
          }
          />
          <button className={styles["prev-btn"]}>Login <i className="fa-solid fa-arrow-right-to-bracket"></i></button>
        </FormWrapper>
      );
}