import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { envFile } from "../../../helper/stringifyDates";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: envFile("GITHUB_ID"),
      clientSecret: envFile("GITHUB_SECRET"),
    }),
    // ...add more providers here
  ],
});
