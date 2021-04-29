import * as yup from 'yup';
import AppError from '../errors/AppError';
import User from '../models/User';

class UpdateUserService {
  async execute({ user_id, name, username, email, location, avatar, bio }) {
    const schema = yup.object().shape({
      user_id: yup.string().required('User ID is missing.'),
      name: yup.string(),
      username: yup.string(),
      email: yup.string().email('Inform a valid email.'),
      location: yup.string(),
      avatar: yup.string().url('Insert a valid avatar URL.'),
      bio: yup.string(),
    });

    const data = await schema.validate({
      user_id,
      name,
      username,
      email,
      location,
      avatar,
      bio,
    });

    const user = await User.findByPk(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    data.email = data.email.toLocaleLowerCase();

    if (email) {
      const emailIsAlreadyInUse = await User.findOne({
        where: { email: data.email },
      });

      if (emailIsAlreadyInUse) {
        throw new AppError('Email is already in use.');
      }

      user.email = data.email;
    }

    if (username) {
      const usernameIsAlreadyInUse = await User.findOne({
        where: { username: data.username },
      });

      if (usernameIsAlreadyInUse) {
        throw new AppError('Username is already in use.');
      }

      user.username = data.username;
    }

    if (name) {
      user.name = data.name;
    }

    if (location) {
      user.location = data.location;
    }

    if (avatar) {
      user.avatar = data.avatar;
    }

    if (bio) {
      user.bio = data.bio;
    }

    await User.update(
      {
        name: user.name,
        username: user.username,
        email: user.email,
        location: user.location,
        avatar: user.avatar,
        bio: user.bio,
      },
      { where: { id: user_id } },
    );

    return user;
  }
}

module.exports = UpdateUserService;
