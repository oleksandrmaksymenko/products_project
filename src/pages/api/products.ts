import {NextApiRequest, NextApiResponse} from 'next';
import {requestHandler} from 'src/lib/requestHandler';

type BodyParamType = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id, name, description, image} = req.body;
  await requestHandler<BodyParamType>(req, res, 'products', 'product_id', {
    id,
    name,
    description,
    image,
  });
}
