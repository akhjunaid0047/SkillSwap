import express from "express";
import appRouter from "./routes";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json());
console.log("Cookie secret:", process.env.COOKIE_SECRET);
app.use(cookieParser(process.env.COOKIE_SECRET as string));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/',appRouter);

export default app;
