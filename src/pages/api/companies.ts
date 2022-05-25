import {NextApiRequest, NextApiResponse} from 'next';
import {dbCollection} from 'src/lib/mongodb';
import {response} from 'src/lib/response';
import {ObjectId} from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const companiesCollection = await dbCollection('companies');
  const companiesResponse = response(res);

  const {
    method,
    body,
    query: {company_id},
  } = req;

  switch (method) {
    case 'GET': {
      if (company_id) {
        const company = await companiesCollection.findOne({
          _id: new ObjectId(company_id as string),
        });

        return companiesResponse(200, company);
      }
      const companies = await companiesCollection.find({}).toArray();
      return companiesResponse(200, companies);
    }
  }
}
