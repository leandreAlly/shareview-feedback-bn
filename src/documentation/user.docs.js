const forgetPassword = {
  tags: ['Users'],
  summary: 'forget password',
  description: 'user get email to reset password',
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
          },
          example: {
            email: 'verify@gmail.com',
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
    },
    500: {
      description: 'Internal Server Error',
    },
  },
};

const resetPassword = {
  tags: ['Users'],
  summary: 'reset password',
  description: 'user use email to reset password',
  parameters: [
    {
      name: 'token',
      in: 'path',
      description: 'Token',
      schema: {
        type: 'string',
      },
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            newPassword: {
              type: 'string',
              required: true,
            },
          },
          example: {
            newPassword: 'verify@gmail.com',
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
    },
    500: {
      description: 'Internal Server Error',
    },
  },
};

const userRouteDocs = {
  '/api/v1/users/forgot-password': {
    post: forgetPassword,
  },

  '/api/v1/users/reset-password/{token}': {
    patch: resetPassword,
  },
};

export default userRouteDocs;
