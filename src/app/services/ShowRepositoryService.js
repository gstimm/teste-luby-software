import * as yup from 'yup';
import Repository from '../models/Repository';
import AppError from '../errors/AppError';

class ShowRepositoryService {
  async execute({ repository_id }) {
    const schema = yup
      .string()
      .uuid('Repository ID must be in the UUIDv4 format.')
      .required('Repository ID is missing.');

    await schema.validate(repository_id);

    const repository = await Repository.findByPk(repository_id, {
      include: { association: 'stars' },
    });

    if (!repository) {
      throw new AppError('Repository not found.', 404);
    }

    return repository;
  }
}

module.exports = ShowRepositoryService;
