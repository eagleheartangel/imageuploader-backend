import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 8080;
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_LOCAL)
  .then(() => {
    app.listen(port, () => {
      console.log('Server on port ' + port);
    });
  })
  .catch((error) => console.log(error));
