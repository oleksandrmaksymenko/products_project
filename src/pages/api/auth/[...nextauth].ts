import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {MongoDBAdapter} from '@next-auth/mongodb-adapter';
import clientPromise from 'src/lib/mongodb';

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  adapter: MongoDBAdapter(clientPromise as any),
});
