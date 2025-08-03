import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
           
          const res = await axios.post("http://localhost:8000/api/v1/user/login", {
          email: credentials?.email,
          password: credentials?.password,
        }, {
          withCredentials: true  
        });

        const user = res.data;
        if (user?.token) {
          return user;
        }
        return null;

        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1000 * 60  * 20
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
