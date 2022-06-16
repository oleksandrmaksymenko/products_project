import {NextApiRequest, NextApiResponse} from 'next';
import {requestHandler} from 'src/lib/requestHandler';

type BodyParamType = {
  name: string;
  id: string;
  description: string;
  image: string;
  userId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id, name, description, image, userId} = req.body;

  const data = await requestHandler<BodyParamType>(
    req,
    res,
    'companies',
    'company_id',
    {
      name,
      id,
      description,
      image,
      userId,
    }
  );

  console.log(data);
}
