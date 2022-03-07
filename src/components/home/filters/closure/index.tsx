import { ClosureType } from "@prisma/client";
import { Checkbox } from "../checkbox";

export const ClosureFilter = () => {
  const closure = Object.keys(ClosureType);
  return (
    <>
      {closure.map((type) => {
        return (
          <Checkbox
            key={type}
            filterGroup="closure"
            id={type}
            label={type.toLocaleLowerCase()}
          />
        );
      })}
    </>
  );
};
