import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to the shareView API" });
});

export default app;
