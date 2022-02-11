import { AggressiveProfile } from "./aggressive";
import { FlatProfile } from "./flat";
import { ModerateProfile } from "./moderate";

type Props = { value: string };

export const Profile = ({ value }: Props) => {
  if (value === "FLAT") return <FlatProfile />;
  if (value === "MODERATE") return <ModerateProfile />;
  return <AggressiveProfile />;
};
