import {NextApiRequest, NextApiResponse} from 'next';
import {requestHandler} from 'src/lib/requestHandler';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id, name, description, image} = req.body;
  await requestHandler(req, res, 'products', 'product_id', {
    id,
    name,
    description,
    image,
  });
}
