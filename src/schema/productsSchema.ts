export const productsSchema = async (client: any) => {
  client.db(process.env.PRODUCT_DB_NAME).createCollection('products', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name', 'price', 'description'],
        additionalProperties: false,
        properties: {
          name: {
            bsonType: 'string',
            description: 'Required product name',
          },
          price: {
            bsonType: 'number',
            minimum: 1,
            maximum: 100000,
            description: 'Required, should be a number',
          },
          description: {
            bsonType: 'string',
            description: 'Required',
          },
        },
      },
    },
  });
};
