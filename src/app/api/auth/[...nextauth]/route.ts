import NextAuth,  { DefaultSession, NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService, AuthResponse } from "@/services/auth-service";

interface JWT {
  accessToken?: string;
  [key: string]: any;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "operator",
      name: "operator",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) return null;
        
        const data: AuthResponse = await authService.login(
          credentials.email,
          credentials.password
        );
        
        return {
          id: data.user.id.toString(),
          name: data.user.name,
          email: data.user.email,
          token: data.token,
        };

      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User & { token?: string } }) {
      if (user?.token) {
        token.accessToken = user.token;
      }
      return token;
    },    
    async session({ session, token }: { session: Session; token: JWT }) {
      (session as any).accessToken = token.accessToken;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
