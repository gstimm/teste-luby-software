import * as yup from 'yup';
import AppError from '../errors/AppError';
import User from '../models/User';
import Follower from '../models/Follower';
import Following from '../models/Following';

class HandleFollowService {
  async execute({ followed_id, follower_id }) {
    const schema = yup.object().shape({
      follower_id: yup.string().required('User ID is required'),
      followed_id: yup.string().required('User to be followed ID is required.'),
    });

    await schema.validate({ follower_id, followed_id });

    const user = await User.findByPk(follower_id);

    if (!user) {
      throw new AppError('You are not Logged in.', 401);
    }

    const userToBeFollowed = await User.findByPk(followed_id);

    if (!userToBeFollowed) {
      throw new AppError('User to be followed not found.', 404);
    }

    if (follower_id === followed_id) {
      throw new AppError('You cant follow yourself.', 400);
    }

    const [, created] = await Following.findOrCreate({
      where: {
        user_id: follower_id,
        following_id: followed_id,
      },
    });

    if (!created) {
      await Following.destroy({
        where: { user_id: follower_id, following_id: followed_id },
      });

      await Follower.destroy({
        where: { user_id: followed_id, follower_id },
      });

      return { status: 'You stopped following.' };
    }

    const follow = await Follower.create({
      user_id: followed_id,
      follower_id,
    });

    return { status: 'You started to follow.', follow };
  }
}

module.exports = HandleFollowService;
