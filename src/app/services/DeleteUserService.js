import User from '../models/User';
import AppError from '../errors/AppError';

class DeleteUserService {
  async execute({ user_id }) {
    const userExists = await User.findByPk(user_id);

    if (!userExists) {
      throw new AppError('User not found.', 404);
    }

    await User.destroy({ where: { id: user_id } });

    return { deleted: true };
  }
}

module.exports = DeleteUserService;
