import { useSession, signIn, signOut } from "next-auth/react";

export const SingedIn = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button className="btn-olive" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button className="btn-olive" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
};
