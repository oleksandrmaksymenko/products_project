import {NextApiRequest, NextApiResponse} from 'next';
import {dbCollection} from 'src/lib/mongodb';
import {response} from 'src/lib/response';
import {ObjectId} from 'mongodb';

type DefaultGenericType = {
  id?: string;
  name?: string;
};

export const requestHandler = async <T extends DefaultGenericType>(
  req: NextApiRequest,
  res: NextApiResponse,
  collectionName: string,
  queryParam: string,
  body: T
) => {
  const collection = await dbCollection(collectionName);
  const resp = response(res);

  switch (req.method?.toLowerCase()) {
    case 'get': {
      try {
        if (req.query[queryParam]) {
          const findCollection = await collection.findOne({
            _id: new ObjectId(queryParam as string),
          });

          return resp(200, findCollection);
        }

        const findAll = await collection.find({}).toArray();
        return resp(200, findAll);
      } catch (e) {
        return resp(500, {error: e});
      }
    }
    case 'post': {
      try {
        const getCollectionByName = await collection.findOne({
          _id: new ObjectId(body.id),
        });

        if (getCollectionByName) {
          return resp(200, {message: 'This id is in used'});
        }

        await collection.insertOne({...body});

        const {id, ...rest} = body;

        return resp(200, rest);
      } catch (e) {
        return resp(500, {error: e});
      }
    }
    case 'patch': {
      try {
        const updateCollection = await collection.findOneAndUpdate(
          {_id: new ObjectId(body.id)},
          {$set: body},
          {upsert: false}
        );

        if (updateCollection) return resp(200, body);
        return resp(404, {
          error: true,
          message: `${collectionName} not found`,
        });
      } catch (e) {
        return resp(500, {error: e});
      }
    }
    case 'delete': {
      try {
        const deleteDocument = await collection.deleteOne({
          _id: new ObjectId(body.id),
        });

        if (deleteDocument) return resp(200, deleteDocument);
        return resp(404, {
          error: true,
          message: `${collectionName} not found`,
        });
      } catch (e) {
        return resp(500, {error: e});
      }
    }
    default:
      return resp(400, {error: true, message: 'Server Error'});
  }
};
