import { Checkbox, FilterGroup } from "../checkbox";

export const Filter = (filterName: FilterGroup, options: string[]) => (
  <>
    {options.map((type) => {
      return (
        <Checkbox
          key={type}
          filterGroup={filterName}
          id={type}
          label={type.toLocaleLowerCase()}
        />
      );
    })}
  </>
);
