import { verify } from 'jsonwebtoken';
import authConfig from '../../config/auth';
import AppError from '../errors/AppError';

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    request.user = { id: decoded.sub };

    return next();
  } catch (err) {
    throw new AppError('Invalid Token.', 401);
  }
};
