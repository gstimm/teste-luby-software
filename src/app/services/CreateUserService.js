import * as yup from 'yup';
import AppError from '../errors/AppError';
import User from '../models/User';

class CreateUserService {
  async execute({ name, username, email, location, avatar, bio }) {
    const schema = yup.object().shape({
      name: yup.string().required('Name is required.'),
      username: yup.string().required('Username is required.'),
      email: yup
        .string()
        .email('Inform a valid email.')
        .required('Email is required.'),
      location: yup.string().required('Location is required.'),
      avatar: yup
        .string()
        .url('Insert a valid avatar URL.')
        .required('Avatar URL is required.'),
      bio: yup.string().required('Bio is required.'),
    });

    const data = await schema.validate({
      name,
      username,
      email,
      location,
      avatar,
      bio,
    });

    data.email = data.email.toLocaleLowerCase();

    const emailIsAlreadyInUse = await User.findOne({
      where: { email: data.email },
    });

    if (emailIsAlreadyInUse) {
      throw new AppError('Email is already in use.');
    }

    const usernameIsAlreadyInUse = await User.findOne({
      where: { username: data.username },
    });

    if (usernameIsAlreadyInUse) {
      throw new AppError('Username is already in use.');
    }

    const user = await User.create(data);

    return user;
  }
}

module.exports = CreateUserService;
