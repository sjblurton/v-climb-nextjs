import { ReactNode, useState } from "react";

type Props = { children: ReactNode };

export const Checkbox = ({ children }: Props) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="block">
      <div className="mt-2 ml-2">
        <label className="inline-flex items-center cursor-pointer text-slate-100">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="w-6 h-6 rounded focus:ring-0 text-olive-700 cursor-pointer"
          />
          <span className="ml-2">{children}</span>
        </label>
      </div>
    </div>
  );
};
