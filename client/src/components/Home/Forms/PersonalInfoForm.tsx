import { FormWrapper } from "./FormsWrapper";

type UserData = {
  firstName: string;
  lastName: string;
  age: string;
};
type UserFormProps = UserData & {
  updateFormState: (fields: Partial<UserData>) => void;
};

export function PersonalInfo({
  firstName,
  lastName,
  age,
  updateFormState,
}: UserFormProps) {
  return (
    <FormWrapper title="Personal Information">
      <label>First name</label>
      <input
        autoFocus
        required
        type="text"
        value={firstName}
        onChange={(e) =>
          updateFormState({
            firstName: e.target.value,
          })
        }
      />
      <label>Last name</label>
      <input
        required
        type="text"
        value={lastName}
        onChange={(e) =>
          updateFormState({
            lastName: e.target.value,
          })
        }
      />
      <label>Age</label>
      <input
        required
        min={1}
        type="number"
        value={age}
        onChange={(e) =>
          updateFormState({
            age: e.target.value,
          })
        }
      />
    </FormWrapper>
  );
}
