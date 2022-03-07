import React, {
  ChangeEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import Fuse from "fuse.js";
import { FilterContext } from "../../../context/context";
import { ActionType } from "../../../reducer/actions";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { dispatch, state } = useContext(FilterContext);

  const options = {
    minMatchCharLength: 3,
    keys: ["name"],
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget = {},
  }) => {
    const { value = "" } = currentTarget;
    value.length > 2 ? setQuery(value) : setQuery("");
  };

  const fuse = new Fuse(state.shoes, options);

  const result = fuse.search(query);

  useEffect(() => {
    result.length > 0
      ? dispatch({
          type: ActionType.SetFilteredShoes,
          payload: { filteredShoes: result.map((shoe) => shoe.item) },
        })
      : dispatch({
          type: ActionType.SetFilteredShoes,
          payload: { filteredShoes: state.shoes },
        });
  }, [query]); //eslint-disable-line

  return (
    <div className="input-group relative flex items-stretch w-full mb-4 rounded">
      <input
        type="search"
        className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal placeholder-slate-200 appearance-none bg-olive-800 border-none text-olive-50 mr-3 leading-tight focus:ring-0 rounded"
        placeholder="Search for your shoes..."
        onChange={handleSearch}
      />
    </div>
  );
};
