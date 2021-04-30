import * as yup from 'yup';
import AppError from '../errors/AppError';
import User from '../models/User';
import Repository from '../models/Repository';

class CreateRepositoryService {
  async execute({ name, description, is_public, user_id }) {
    const schema = yup.object().shape({
      name: yup.string().required('Name is missing.'),
      description: yup.string(),
      is_public: yup.boolean().required('Define if your repository is public.'),
      user_id: yup.string().required('User ID is missing.'),
    });

    const data = await schema.validate({
      name,
      description,
      is_public,
      user_id,
    });

    data.name.toLocaleLowerCase();

    data.public = data.is_public;

    const userExists = await User.findByPk(user_id);

    if (!userExists) {
      throw new AppError(
        'User not logged in, please log in to create a repository. ',
        401,
      );
    }

    const repositoryExists = await Repository.findOne({
      where: { user_id, name: data.name },
    });

    if (repositoryExists) {
      throw new AppError('Repository already exists.');
    }

    Object.assign(data, {
      slug: `${userExists.username.replace(/ /g, '-')}/${data.name.replace(
        / /g,
        '-',
      )}`,
    });

    const repository = await Repository.create(data);

    return repository;
  }
}

module.exports = CreateRepositoryService;
