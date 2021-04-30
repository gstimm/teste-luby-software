import * as yup from 'yup';
import Repository from '../models/Repository';
import AppError from '../errors/AppError';

class UpdateRepositoryService {
  async execute({ user_id, repository_id, name, description, is_public }) {
    const schema = yup.object().shape({
      user_id: yup.string().required('User ID is missing.'),
      repository_id: yup.string().required('Repository ID is missing.'),
      name: yup.string(),
      description: yup.string(),
      is_public: yup.boolean('Define if your repository is public.'),
    });

    const data = await schema.validate({
      user_id,
      repository_id,
      name,
      description,
      is_public,
    });

    data.name.toLowerCase();

    const repository = await Repository.findOne({
      where: { user_id, id: repository_id },
      include: { association: 'stars' },
    });

    if (!repository) {
      throw new AppError('Repository not found.', 404);
    }

    if (name) {
      const nameIsAlreadyInUse = await Repository.findOne({
        where: { user_id, id: repository_id, name },
      });

      if (nameIsAlreadyInUse) {
        throw new AppError('Repository name is already in use.');
      }

      repository.name = name;

      const [username] = repository.slug.split('/');

      repository.slug = `${username}/${name.replace(/ /g, '-')}`;
    }

    if (description) {
      repository.description = description;
    }

    if (is_public === false) {
      repository.public = false;
    }

    repository.public = is_public;

    await Repository.update(
      {
        name: repository.name,
        description: repository.description,
        public: repository.public,
        slug: repository.slug,
      },
      { where: { id: repository_id } },
    );

    return repository;
  }
}

module.exports = UpdateRepositoryService;
