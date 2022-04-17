import {DefaultSession} from 'next-auth';
import type {UserTypes} from 'src/types/UserTypes';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserTypes & DefaultSession['user'];
  }
}
