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
const login = {
  tags: ['Users'],
  description: 'Login with email and password',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              required: true,
            },
            password: {
              type: 'string',
              required: true,
            },
          },
        },
        example: {
          email: 'verified@gmail.com',
          password: 'Pass@123',
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
    },
    404: {
      description: 'NOTFOUND',
    },
  },
};
const authenticationRouteDocs = {
  '/api/v1/users/register': {
    post: register,
  },
  '/api/v1/users/login': {
    post: login,
  },
};

export default authenticationRouteDocs;
