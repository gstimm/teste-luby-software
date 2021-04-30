import * as yup from 'yup';
import User from '../models/User';
import Repository from '../models/Repository';
import Star from '../models/Star';
import AppError from '../errors/AppError';

class HandleStarService {
  async execute({ user_id, repository_id }) {
    const schema = yup.object().shape({
      user_id: yup.string().required('User ID is missing.'),
      repository_id: yup.string().required('Repository ID is missing.'),
    });

    await schema.validate({ user_id, repository_id });

    const user = await User.findByPk(user_id);

    if (!user) {
      throw new AppError('You are not logged in.', 404);
    }

    const repository = await Repository.findByPk(repository_id);

    if (!repository) {
      throw new AppError('Repository not found.', 404);
    }

    const [star, created] = await Star.findOrCreate({
      where: {
        user_id,
        repository_id,
      },
    });

    if (!created) {
      await Star.destroy({
        where: {
          user_id,
          repository_id,
        },
      });

      return { status: 'You unstarred the repository.' };
    }

    return { status: 'You starred the repository.', star };
  }
}

module.exports = HandleStarService;
