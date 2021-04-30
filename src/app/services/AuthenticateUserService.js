import * as yup from 'yup';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import Token from '../models/Token';
import authConfig from '../../config/auth';
import AppError from '../errors/AppError';

class AuthenticateUserService {
  async execute({ username }) {
    const schema = yup.object().shape({
      username: yup.string().required('Username is required.'),
    });

    await schema.validate({ username });

    const user = await User.findOne({
      where: { username },
    });

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
