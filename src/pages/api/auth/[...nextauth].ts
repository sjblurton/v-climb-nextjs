import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { envString } from "../../../helper/stringify";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: envString("GITHUB_ID"),
      clientSecret: envString("GITHUB_SECRET"),
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = user.email === envString("ADMIN_EMAIL");
      if (isAllowedToSignIn) {
        return true;
      } else {
        console.error("user not admin");
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
});
