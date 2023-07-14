import dotenv from "dotenv";
import http from "http";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const startServer = () => {
  server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}....`);
  });
};

startServer();
