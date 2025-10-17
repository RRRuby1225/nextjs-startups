import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  //  By default, the `id` property does not exist on `token` or `session`. See the [TypeScript](https://authjs.dev/getting-started/typescript) on how to add it.
  callbacks: {
    async signIn({ 
      user:{name,email,image},
      profile:{id,login,bio}
    }) {
      const existingUser = await client
      .withConfig({useCdn: false,})
      .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
        id,
      });
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }
      return true;
    },

    async jwt({ token, account,profile }) {
      if (account && profile) {
        const user = await client
        .withConfig({useCdn: false})
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });
        token.id = user?._id;
        // console.log("JWT Callback:", { token, profile, user });
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session, {id: token.id,});
      // console.log("Session Callback:", { session, token }); // Debug
      return session;
    },
  },
})