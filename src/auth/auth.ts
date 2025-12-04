import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { login } from "@/src/app/api/users";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(
            "El correo electrónico y la contraseña son requeridos"
          );
        }

        try {
          const response = await login({
            email: credentials.email,
            password: credentials.password,
          });

          const token = response; // depende de tu backend

          if (!token) {
            throw new Error("Token no recibido desde el backend");
          }

          const payload = JSON.parse(atob(token.split(".")[1]));

          return {
            id: payload.Id,
            email: payload.Email,
            name: payload.FullName,
            accessToken: token,
          };
        } catch (err: any) {
          throw new Error(
            err.response?.data?.message ?? "Error de conexión con el servidor"
          );
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;

        // Calculamos expiración si viene en el token
        const payload = JSON.parse(atob(user.accessToken!.split(".")[1]));
        token.exp = payload.exp;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
