import * as yup from 'yup';
import Repository from '../models/Repository';
import AppError from '../errors/AppError';

class DeleteRepositoryService {
  async execute({ user_id, repository_id }) {
    const schema = yup.object().shape({
      user_id: yup.string().required('User ID is missing.'),
      repository_id: yup.string().required('Repository ID is missing.'),
    });

    await schema.validate({ user_id, repository_id });

    const repositoryExists = await Repository.findOne({
      where: { user_id, id: repository_id },
    });

    if (!repositoryExists) {
      throw new AppError('Repository not found.', 404);
    }

    await Repository.destroy({ where: { user_id, id: repository_id } });
  }
}

module.exports = DeleteRepositoryService;
