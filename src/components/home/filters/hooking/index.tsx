import { HookingType } from "@prisma/client";
import { Checkbox } from "../checkbox";

export const HookingFilter = () => {
  const hooking = Object.keys(HookingType);
  return (
    <>
      {hooking.map((type) => {
        return (
          <Checkbox
            key={type}
            filterGroup="hooking"
            id={type}
            label={type.toLocaleLowerCase()}
          />
        );
      })}
    </>
  );
};
