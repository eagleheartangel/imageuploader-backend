import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';

// import { setup } from './libs/setup';
// setup();

const app = express();
app.use(
  fileUpload({
    limits: { fileSize: 10000000 },
    abortOnLimit: true,
    createParentPath: true,
  })
);
app.use(compression());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  })
);

import imageRoutes from './routes/image';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', imageRoutes);

module.exports = app;
