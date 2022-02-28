import { VolumeType } from "@prisma/client";
import { Checkbox } from "../checkbox";

export const VolumeFilter = () => {
  const volume = Object.keys(VolumeType);
  return (
    <>
      {volume.map((type) => {
        return (
          <Checkbox
            key={type}
            filterGroup="volume"
            id={type}
            label={type.toLocaleLowerCase()}
          />
        );
      })}
    </>
  );
};
