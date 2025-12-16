import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";


const ALLOWED_EMAIL = "mahdi.mousavi001@gmail.com";

const handler = NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      return user.email === ALLOWED_EMAIL;
    },
  },

  pages: {
    error: "/error",
  },

});

export { handler as GET, handler as POST };
