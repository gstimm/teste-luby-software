import express from 'express';
import 'express-async-errors';
import { ValidationError } from 'yup';
import AppError from './app/errors/AppError';
import userRouter from './routes/user.routes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/users', userRouter);
  }

  errorHandler() {
    this.app.use(async (error, request, response, next) => {
      if (error instanceof ValidationError) {
        return response
          .status(400)
          .json({ errors: error.errors.map(error => error) });
      }
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          message: error.message,
        });
      }
      console.error(error);
      return response.status(500).json({ message: 'Internal Server Error.' });
    });
  }
}

export default new App().app;
