import {GetServerSidePropsContext, NextPageContext} from 'next';
import {getSession} from 'next-auth/react';
import clientPromise from 'src/lib/mongodb';

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

export const checkSession = async <T>(
  ctx: GetServerSidePropsContext,
  signIn?: string,
  signOut?: string,
  isRedirect?: boolean,
  props?: T
) => {
  const session = await getSession(ctx);
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const user = await db
    .collection('users')
    .findOne({email: session?.user.email});
  const roles = await db
    .collection('roles')
    .findOne({userId: user?._id.toString()});
  const companies = await db.collection('companies').find({}).toArray();
  console.log(companies);

  if (session) {
    if (!companies.length) {
      return {
        props: {
          companies: !companies.length,
          session,
          role: roles.role,
          isAllowed: !!roles.role,
          ...props,
        },
      };
    }

    return {
      ...redirect(signIn, isRedirect),
      props: {
        session,
        role: roles.role,
        isAllowed: !!roles.role,
        ...props,
      },
    };
  }

  return {
    ...redirect(signOut, isRedirect),
    props: {},
  };
};
