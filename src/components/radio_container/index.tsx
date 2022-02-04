import { useState } from "react";
import { RadioButton } from "./radio_button";

type Props = {
  list: string[];
  radioDefault: string;
};

export const RadioContainer = ({ list, radioDefault }: Props) => {
  const [checked, setChecked] = useState(radioDefault);

  return (
    <div className="flex flex-col">
      {list.map((item) => (
        <RadioButton
          checked={checked}
          setChecked={setChecked}
          key={item}
          label={item}
        />
      ))}
    </div>
  );
};
