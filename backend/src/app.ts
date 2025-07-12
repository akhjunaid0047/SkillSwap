import express from "express";
import appRouter from "./routes";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/',appRouter);

export default app;
