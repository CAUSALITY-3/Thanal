// import { NextAuthOptions } from "next-auth";
// import NextAuth from "next-auth/next";
// import GoogleProvider from 'next-auth/providers/google';

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

// const authOption: NextAuthOptions = {
//     pages: {
//         signIn: '/login'
//     },
//     session: {
//         strategy: 'jwt'
//     },
//     providers: [
//         GoogleProvider({
//             clientId: GOOGLE_CLIENT_ID,
//             clientSecret: GOOGLE_CLIENT_SECRET
//         })
//     ],
//     callbacks:{
//         async signIn({account, profile}) {
//             if(!profile?.email) {
//                 throw new Error('No profile')
//             }
//             return true;
//         }
//     }
// }

// const handler = NextAuth(authOption)
// export {handler as GET, handler as POST}

import NextAuth from "next-auth/next";
import { options } from './options'

const handler = NextAuth(options)
export {handler as GET, handler as POST}