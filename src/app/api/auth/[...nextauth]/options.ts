import { apiCall } from "@/api/sevice";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }
      const upsertUser = await apiCall(
        "post",
        "UPSERT_USER",
        {},
        "",
        JSON.stringify(profile),
        {
          "Content-Type": "application/json",
        }
      );
      console.log("upsetedDoc", upsertUser);
      return true;
    },
    async redirect({url, baseUrl}) {
      console.log('url', url);
      console.log('baseUrl', baseUrl);
      
      return url.startsWith(baseUrl) ? url : baseUrl + '/signup';
    }
  },
};
