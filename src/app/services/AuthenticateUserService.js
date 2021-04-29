import { sign } from 'jsonwebtoken';
import authConfig from '../../config/auth';
import AppError from '../errors/AppError';
import User from '../models/User';
import Token from '../models/Token';

class AuthenticateUserService {
  async execute({ username }) {
    if (!username) {
      throw new AppError('Username is missing.');
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: String(user.id),
      expiresIn: authConfig.jwt.expiresIn,
    });

    await Token.create({
      user_id: user.id,
    });

    return { user, token };
  }
}

module.exports = AuthenticateUserService;
