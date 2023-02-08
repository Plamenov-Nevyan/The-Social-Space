import { FormWrapper } from "./FormsWrapper";

type AdressData = {
  street: string;
  city: string;
  state: string;
  ZIP: string;
};

type AdressFormProps = AdressData & {
  updateFormState: (fields: Partial<AdressData>) => void;
};

export function AdressForm({
  street,
  city,
  state,
  ZIP,
  updateFormState,
}: AdressFormProps) {
  return (
    <FormWrapper title="Adress details">
      <label>Street</label>
      <input
        autoFocus
        required
        type="text"
        value={street}
        onChange={(e) =>
          updateFormState({
            street: e.target.value,
          })
        }
      />
      <label>City</label>
      <input
        required
        type="text"
        value={city}
        onChange={(e) =>
          updateFormState({
            city: e.target.value,
          })
        }
      />
      <label>State</label>
      <input
        required
        type="text"
        value={state}
        onChange={(e) =>
          updateFormState({
            state: e.target.value,
          })
        }
      />
      <label>ZIP</label>
      <input
        required
        type="text"
        value={ZIP}
        onChange={(e) =>
          updateFormState({
            ZIP: e.target.value,
          })
        }
      />
    </FormWrapper>
  );
}
