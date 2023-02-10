import { FormWrapper } from "./FormsWrapper";

type AccountData = {
  email: string;
  password: string;
};
type AccountFormProps = AccountData & {
  updateFormState: (fields: Partial<AccountData>) => void;
};

export function AccountForm({
  email,
  password,
  updateFormState,
}: AccountFormProps) {
  return (
    <FormWrapper title="Account Creation">
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
    </FormWrapper>
  );
}
