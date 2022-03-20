import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../../../context/context";
import { ActionType } from "../../../../reducer/actions";

export type FilterGroup =
  | "brand"
  | "rubber"
  | "midsole"
  | "vegan"
  | "rubberStiffness"
  | "hooking"
  | "closure"
  | "asymmetry"
  | "price"
  | "profile"
  | "rubberThickness"
  | "volume";

type Props = { label: string; id: string; filterGroup: FilterGroup };

export const Checkbox = ({ label, id, filterGroup }: Props) => {
  const [checked, setChecked] = useState(false);
  const { state, dispatch } = useContext(FilterContext);

  useEffect(() => {
    if (state.filters) {
      filterGroup === "brand" && setChecked(state.filters.brands.includes(id));
      filterGroup === "rubber" &&
        setChecked(state.filters.rubbers.includes(id));
      filterGroup === "midsole" &&
        setChecked(state.filters.midsole.includes(id));
      filterGroup === "vegan" &&
        setChecked(state.filters.veganType.includes(id));
      filterGroup === "rubberStiffness" &&
        setChecked(state.filters.rubber_stiffness.includes(id));
      filterGroup === "hooking" &&
        setChecked(state.filters.hooking.includes(id));
      filterGroup === "closure" &&
        setChecked(state.filters.closure.includes(id));
      filterGroup === "asymmetry" &&
        setChecked(state.filters.asymmetry.includes(id));
      filterGroup === "price" && setChecked(state.filters.price.includes(id));
      filterGroup === "profile" &&
        setChecked(state.filters.profile.includes(id));
      filterGroup === "rubberThickness" &&
        setChecked(state.filters.rubber_thickness.includes(id));
      filterGroup === "volume" && setChecked(state.filters.volume.includes(id));
    }
  }, [state]); // eslint-disable-line

  const handleOnChange = () => {
    filterGroup === "brand" &&
      dispatch({ type: ActionType.AddBrandFilter, payload: id });
    filterGroup === "rubber" &&
      dispatch({ type: ActionType.AddRubberFilter, payload: id });
    filterGroup === "midsole" &&
      dispatch({ type: ActionType.AddMidsoleFilter, payload: id });
    filterGroup === "vegan" &&
      dispatch({ type: ActionType.AddVeganFilter, payload: id });
    filterGroup === "rubberStiffness" &&
      dispatch({ type: ActionType.AddRubberStiffnessFilter, payload: id });
    filterGroup === "asymmetry" &&
      dispatch({ type: ActionType.AddAsymmetryFilter, payload: id });
    filterGroup === "closure" &&
      dispatch({ type: ActionType.AddClosureFilter, payload: id });
    filterGroup === "hooking" &&
      dispatch({
        type: ActionType.AddHookingFilter,
        payload: id,
      });
    filterGroup === "price" &&
      dispatch({
        type: ActionType.AddPriceFilter,
        payload: id,
      });
    filterGroup === "profile" &&
      dispatch({
        type: ActionType.AddProfileFilter,
        payload: id,
      });
    filterGroup === "rubberThickness" &&
      dispatch({
        type: ActionType.AddRubberThicknessFilter,
        payload: id,
      });
    filterGroup === "volume" &&
      dispatch({
        type: ActionType.AddVolumeFilter,
        payload: id,
      });
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
