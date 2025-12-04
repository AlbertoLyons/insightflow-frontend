/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultSession } from "next-auth";

import { UserRole } from "@/models/entities";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    user: {
      /** The user's unique identifier */
      id?: string;
      roles?: UserRole[];
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    accessToken?: string;
    roles?: UserRole[];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken?: string;
    exp?: number;
    refreshAttempted?: boolean;
    roles?: string; // El string JSON de roles del backend
  }
}
