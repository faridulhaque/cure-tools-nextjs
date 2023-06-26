import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";

const clientId: any = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const clientSecret: any = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
};
export default NextAuth(options);
