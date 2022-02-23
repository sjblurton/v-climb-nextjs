import { useCheckbox } from "../../hooks/custom";
import {
  BrandWithStringDates,
  CheckboxTypes,
  RubberWithStringDates,
} from "../../interface";

type Props = {
  type: CheckboxTypes;
  label: string;
  state: string[];
};

export const Checkboxes = ({ type, label, state }: Props) => {
  const { value, setCheckbox } = useCheckbox(type, label, state);

  return (
    <label>
      <input
        type="checkbox"
        checked={value}
        onChange={() => setCheckbox(type, label)}
      />
      {label}
    </label>
  );
};
