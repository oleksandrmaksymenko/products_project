import {NextApiRequest, NextApiResponse} from 'next';
import {requestHandler} from 'src/lib/requestHandler';

type BodyParamType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {email, firstName, lastName, id} = req.body;
  await requestHandler<BodyParamType>(req, res, 'users', 'user_id', {
    email,
    firstName,
    lastName,
    id,
  });
}
