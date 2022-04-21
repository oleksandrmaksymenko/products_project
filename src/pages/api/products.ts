import {NextApiRequest, NextApiResponse} from 'next';
import {dbCollection} from 'src/lib/mongodb';
import {ObjectId} from 'mongodb';
import {response} from 'src/lib/response';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productsCollection = await dbCollection('products');
  const productResponse = response(res);

  const {
    method,
    body: {id, name, description, image},
    query: {product_id},
  } = req;

  switch (method) {
    case 'GET': {
      if (product_id) {
        const product = await productsCollection.findOne({
          _id: new ObjectId(product_id as string),
        });
        return productResponse(200, product);
      }
      const products = await productsCollection.find({}).toArray();
      return productResponse(200, products);
    }
    case 'POST': {
      const prod = {
        name,
        description,
        image,
      };

      await productsCollection.insertOne(prod);

      return productResponse(200, prod);
    }
    case 'PATCH': {
      const updatedProduct = await productsCollection.findOneAndUpdate(
        {_id: new ObjectId(id)},
        {$set: {name, description, image}},
        {upsert: false}
      );

      if (updatedProduct)
        return productResponse(200, {id, name, description, image});
      return productResponse(404, {error: true, message: 'Product not found'});
    }
    case 'DELETE': {
      const deletedUser = await productsCollection.deleteOne({
        _id: new ObjectId(id),
      });

      if (deletedUser) return productResponse(200, deletedUser);
      return productResponse(404, {error: true, message: 'User not found'});
    }

    default:
      return productResponse(400, {error: true, message: 'Server Error'});
  }
}
