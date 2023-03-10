import { FormWrapper } from "./FormsWrapper";
import styles from "../home.module.css"
import {useState} from "react"

type ProfileData = {
  nickname: string;
  interests: string[];
  description: string;
};

type ProfileFormProps = ProfileData & {
  updateFormState: (fields: Partial<ProfileData>) => void;
};

export function ProfileDataForm({
  nickname,
  interests,
  description,
  updateFormState,
}: ProfileFormProps) {

  const [interestTags, setInterests] = useState<string[]>(interests)
  const [interestInput, setInterestInput] = useState('')

  return (
    <FormWrapper title="Profile details">
      <label>Your Nickname</label>
      <input
        autoFocus
        required
        type="text"
        value={nickname}
        onChange={(e) =>
          updateFormState({
            nickname: e.target.value,
          })
        }
      />
      <label>Interests</label>
      <div className={styles["interest-tags-container"]}>
        {interestTags.length > 0
         ? interestTags.map((interest, index) => <div key={index} className={styles["tag-item"]}>
            <span className={styles.interestText}>{interest}</span>
            <span className={styles.close}
            onClick = {(e) => {
              setInterests(currentInterests => currentInterests.filter(currTag => currTag !== interest))
              updateFormState({
                interests : interests.filter(currInterest => currInterest !== interest)
              })
            }}
            >
              &times;
              </span>
         </div>
         )
         :<span>Your interests will be tagged here</span>
        }
      <input
        className={styles["tags-input"]}
        value={interestInput}
        type="text"
        placeholder="Pets, music, cars, etc..."
        onChange={(e) => setInterestInput(e.target.value)}
        onKeyDown={(e) =>{
          if(e.key === 'Enter'){
            e.preventDefault()
            setInterests([...interestTags, (e.target as HTMLInputElement).value.trim()])
            updateFormState({
              interests: [...interests, (e.target as HTMLInputElement).value.trim()]
            })
            setInterestInput('')
          }
        }
        }
      />
      </div>
      <label>Describe yourself with few words</label>
      <textarea
        required
        value={description}
        onChange={(e) =>
          updateFormState({
            description: e.target.value,
          })
        }
       >
      </textarea>
    </FormWrapper>
  );
}
