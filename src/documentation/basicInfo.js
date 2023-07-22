import dotenv from 'dotenv';

dotenv.config();

const basicInfo = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'shareView feedback app APIs Document',
    description: 'Managing feedback in one cross platform using shareView API',
    termsOfService: '',
    contact: {
      name: 'Leandre Ally',
      email: 'tuyambazeleandre@gmail.com',
      url: 'https://leandredev.netlify.app/',
    },
  },
  schemes: ['HTTP', 'HTTPS'],
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
      description: 'Local server',
    },
    {
      url: 'https://shareview.onrender.com',
      description: 'Hosted version',
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
};

export default basicInfo;
