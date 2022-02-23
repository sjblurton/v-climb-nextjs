import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../../context/context";
import { ActionType } from "../../../reducer/actions";

type FilterGroup = "brand";

type Props = { label: string; id: string };

export const Checkbox = ({ label, id }: Props) => {
  const [checked, setChecked] = useState(false);
  const { state, dispatch } = useContext(FilterContext);

  useEffect(() => {
    setChecked(state.filters.brands.includes(id));
  }, [state]); // eslint-disable-line

  return (
    <div className="block">
      <div className="mt-2 ml-2">
        <label className="inline-flex items-center cursor-pointer text-slate-100">
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              dispatch({ type: ActionType.AddBrandFilter, payload: id })
            }
            className="w-6 h-6 rounded focus:ring-0 text-olive-700 cursor-pointer"
          />
          <span className="ml-2">{label}</span>
        </label>
      </div>
    </div>
  );
};
