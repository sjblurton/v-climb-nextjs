import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../button";

export const SingedIn = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
};
