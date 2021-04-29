import * as yup from 'yup';
import User from '../models/User';
import AppError from '../errors/AppError';

class ShowUserService {
  async execute({ username }) {
    const schema = yup.object().shape({
      username: yup.string(),
    });

    const data = await schema.validate({ username });

    const user = await User.findOne({ where: { username: data.username } });

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }
}

module.exports = ShowUserService;
