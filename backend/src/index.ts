import app from './app';
import connectDB from './db/connect';
import dotenv from 'dotenv';

dotenv.config();

connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on PORT: ${process.env.PORT}`);
    });
  })
  .catch(error => {
    console.error(error);
  });
