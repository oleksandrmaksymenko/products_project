import {NextApiRequest, NextApiResponse} from 'next';
import {dbCollection} from 'src/lib/mongodb';
import {ObjectId} from 'mongodb';
import {response} from 'src/lib/response';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const usersCollection = await dbCollection('users');
  const userResponse = response(res);

  switch (req.method) {
    case 'GET': {
      const {user_id} = req.query;
      if (user_id) {
        const findUser = await usersCollection.findOne({
          _id: new ObjectId(user_id as string),
        });
        return userResponse(200, findUser);
      }
      const findUsers = await usersCollection.find({}).toArray();
      return userResponse(200, findUsers);
    }
    case 'POST': {
      const {email, firstName, lastName} = req.body;
      const findUser = await usersCollection.find({email});

      if (findUser) {
        const user = {
          email,
          firstName,
          lastName,
          createdAt: Date.now(),
        };

        await usersCollection.insertOne(user);

        return userResponse(200, user);
      }

      return userResponse(401, {error: true, message: 'User already exist'});
    }
    case 'PATCH': {
      try {
        const {email, firstName, lastName, _id} = req.body;

        const user = {
          firstName,
          email,
          lastName,
          image: '',
          updatedAt: Date.now(),
        };
        const updatedUser = await usersCollection.findOneAndUpdate(
          {_id: new ObjectId(_id)},
          {$set: {...user}},
          {upsert: false}
        );

        if (updatedUser) {
          return userResponse(200, user);
        }
      } catch (e) {
        console.dir(e);
      }

      return userResponse(404, {error: true, message: 'User not found'});
    }
    case 'DELETE': {
      const {id} = req.body;
      const deletedUser = await usersCollection.deleteOne({
        _id: new ObjectId(id),
      });

      if (deletedUser) {
        return userResponse(200, {id});
      }
      return userResponse(404, {error: true, message: 'User not fount'});
    }
    default:
      return userResponse(500, {error: true, message: 'Server Error'});
  }
}
