import { ProfileType } from "@prisma/client";
import { Checkbox } from "../checkbox";

export const ProfileFilter = () => {
  const profile = Object.keys(ProfileType);
  return (
    <>
      {profile.map((type) => {
        return (
          <Checkbox
            key={type}
            filterGroup="profile"
            id={type}
            label={type.toLocaleLowerCase()}
          />
        );
      })}
    </>
  );
};
