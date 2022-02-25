import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../../context/context";
import { ActionType } from "../../../reducer/actions";

type FilterGroup = "brand" | "rubber";

type Props = { label: string; id: string; filterGroup: FilterGroup };

export const Checkbox = ({ label, id, filterGroup }: Props) => {
  const [checked, setChecked] = useState(false);
  const { state, dispatch } = useContext(FilterContext);

  useEffect(() => {
    filterGroup === "brand" && setChecked(state.filters.brands.includes(id));
    filterGroup === "rubber" && setChecked(state.filters.rubbers.includes(id));
  }, [state]); // eslint-disable-line

  const handleOnChange = () => {
    filterGroup === "brand" &&
      dispatch({ type: ActionType.AddBrandFilter, payload: id });
    filterGroup === "rubber" &&
      dispatch({ type: ActionType.AddRubberFilter, payload: id });
  };

  return (
    <div className="block">
      <div className="mt-2 ml-2">
        <label className="inline-flex items-center cursor-pointer text-slate-100">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleOnChange}
            className="w-6 h-6 rounded focus:ring-0 text-olive-700 cursor-pointer"
          />
          <span className="ml-2">{label}</span>
        </label>
      </div>
    </div>
  );
};
