import {NextApiRequest, NextApiResponse} from 'next';
import {requestHandler} from 'src/lib/requestHandler';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {email, firstName, lastName, id} = req.body;
  await requestHandler(req, res, 'users', 'user_id', {
    email,
    firstName,
    lastName,
    id,
  });
}
