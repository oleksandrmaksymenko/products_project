import {NextApiResponse} from 'next';

export const response =
  (res: NextApiResponse) => (status: number, json: object) =>
    res.status(status).json(json);
