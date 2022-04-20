import {NextApiRequest, NextApiResponse} from 'next';
import clientPromise from 'src/lib/mongodb';
import {ObjectId} from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const usersCollection = await client.db('projectName').collection('users');

  switch (req.method) {
    case 'GET': {
      const findUsers = await usersCollection.find({}).toArray();
      return res.status(200).json(findUsers);
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

        return res.status(200).json(user);
      }

      return res.status(401).json({error: true, message: 'User already exist'});
    }
    case 'PATCH': {
      try {
        const {email, firstName, lastName, id} = req.body;

        const user = {
          firstName,
          email,
          lastName,
          image: '',
          updatedAt: Date.now(),
        };
        const updatedUser = await usersCollection.updateOne(
          {_id: new ObjectId(id)},
          {
            $set: user,
          },
          {upsert: true}
        );

        if (updatedUser) {
          return res.status(200).json(user);
        }
      } catch (e) {
        console.dir(e);
      }

      return res.status(404).json({error: true, message: 'User not found'});
    }
    case 'DELETE': {
      const {id} = req.body;
      const deletedUser = await usersCollection.deleteOne({
        _id: new ObjectId(id),
      });

      if (deletedUser) {
        return res.status(200).json({id});
      }

      return res.status(404).json({error: true, message: 'User not fount'});
    }
    default:
      return res.status(500).json({error: true, message: 'Server Error'});
  }
}
