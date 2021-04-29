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
    this.errors();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/users', userRouter);
  }

  errors() {
    this.app.use((error, request, response, _next) => {
      if (error instanceof ValidationError) {
        return response
          .status(400)
          .json({ errors: error.errors.map(error => error) });
      }
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: 'Client Error.',
          message: error.message.message,
        });
      }
      console.error(error);
      return response.status(500).json({ message: 'Internal Server Error.' });
    });
  }
}

export default new App().app;
