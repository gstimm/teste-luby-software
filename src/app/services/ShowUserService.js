import * as yup from 'yup';
import User from '../models/User';
import AppError from '../errors/AppError';

class ShowUserService {
  async execute({ id }) {
    const schema = yup
      .string()
      .uuid('User ID must be in the UUIDv4 format.')
      .required('User ID is missing.');

    await schema.validate(id);

    const user = await User.findByPk(id, {
      include: [
        { association: 'followers', include: { association: 'follower' } },
        { association: 'followings', include: { association: 'following' } },
        { association: 'repositories', include: { association: 'stars' } },
        { association: 'stars_given' },
        { association: 'tokens' },
      ],
    });

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }
}

module.exports = ShowUserService;
