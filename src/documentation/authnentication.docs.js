const register = {
  tags: ['Users'],
  description: 'User Registration',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            firstname: {
              type: 'string',
              required: true,
            },
            lastname: {
              type: 'string',
              required: true,
            },
            email: {
              type: 'string',
              required: true,
            },
            password: {
              type: 'string',
              required: true,
            },
          },
          example: {
            firstname: 'NameOne',
            lastname: 'NameTwo',
            email: 'example@gmail.com',
            password: '@Test123',
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: 'REGISTERED',
    },
    400: {
      description: 'VALIDATION ERROR',
    },
    409: {
      description: 'USER ALREADY EXISTS',
    },
    500: {
      description: 'INTERNAL SERVER ERROR',
    },
  },
};

const authenticationRouteDocs = {
  '/api/v1/users/register': {
    post: register,
  },
};

export default authenticationRouteDocs;
