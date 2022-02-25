import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../../context/context";
import { Checkbox } from "../checkbox";

export const RubbersFilter = () => {
  const { state } = useContext(FilterContext);
  const [rubbers, setRubbers] = useState(state.filteredBrands);

  useEffect(() => {
    console.log(state.filteredRubbers);
    setRubbers(state.filteredRubbers);
  }, [state.filteredRubbers]);

  return (
    <>
      {rubbers.map((rubber) => (
        <Checkbox
          filterGroup="rubber"
          key={rubber.id}
          id={rubber.id}
          label={rubber.name}
        />
      ))}
    </>
  );
};
