import dotenv from 'dotenv';
import http from 'http';
import app from './app';
import connectDB from './services/connectDb';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}....`);
  });
};

startServer();
