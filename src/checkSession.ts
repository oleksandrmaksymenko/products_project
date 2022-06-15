import {GetServerSidePropsContext} from 'next';
import {getSession} from 'next-auth/react';
import clientPromise from 'src/lib/mongodb';
import {ObjectId} from 'mongodb';

const redirect = (destination?: string, isRedirect?: boolean) => {
  if (isRedirect && destination) {
    return {
      redirect: {
        permanent: true,
        destination,
      },
    };
  }
};

type CheckSessionType = {
  context: GetServerSidePropsContext;
  signIn?: string;
  signOut?: string;
  isRedirect?: boolean;
};

export const checkSession = async <T>(
  {context, signIn, signOut, isRedirect}: CheckSessionType,
  props?: T
) => {
  const session = await getSession(context);
  const client = await clientPromise;
  const adminDb = client.db(process.env.DB_NAME);
  const userDb = client.db(process.env.PRODUCT_DB_NAME);

  const user = await adminDb
    .collection('users')
    .findOne({email: session?.user.email});
  const roles = await adminDb
    .collection('roles')
    .findOne({userId: user?._id.toString()});
  const companies = await userDb
    .collection('companies')
    .find({userId: new ObjectId(user?._id.toString())})
    .toArray();
  // TODO: DO some with companies
  if (session) {
    return {
      ...redirect(signIn || '/', isRedirect || false),
      props: {
        session,
        role: roles.role,
        isAllowed: !!roles.role,
        ...props,
      },
    };
  }

  return {
    ...redirect(signOut || '/', isRedirect || false),
    props: {},
  };
};
