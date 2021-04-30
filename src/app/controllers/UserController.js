import AuthenticateUserService from '../services/AuthenticateUserService';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import HandleFollowService from '../services/HandleFollowService';
import IndexUserService from '../services/IndexUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';
import AppError from '../errors/AppError';
import UserView from '../views/UserView';

class UserController {
  async store(request, response) {
    try {
      const { name, username, email, location, avatar, bio } = request.body;

      const createUserService = new CreateUserService();

      const user = await createUserService.execute({
        name,
        username,
        email,
        location,
        avatar,
        bio,
      });

      return response.status(201).json(UserView.render(user));
    } catch (err) {
      throw new AppError(err, err.statusCode);
    }
  }

  async login(request, response) {
    try {
      const { username } = request.body;

      const authenticateUserService = new AuthenticateUserService();

      const { user, token } = await authenticateUserService.execute({
        username,
      });

      return response.status(200).json({ user: UserView.render(user), token });
    } catch (err) {
      throw new AppError(err, err.statusCode);
    }
  }

  async index(request, response) {
    try {
      const indexUserService = new IndexUserService();
      const users = await indexUserService.execute();

      return response.status(200).json({ users: UserView.renderMany(users) });
    } catch (err) {
      throw new AppError(err, err.statusCode);
    }
  }

  async show(request, response) {
    try {
      const { username } = request.params;
      const showUserService = new ShowUserService();
      const user = await showUserService.execute({ username });

      return response.status(200).json(UserView.render(user));
    } catch (err) {
      throw new AppError(err, err.statusCode);
    }
  }

  async update(request, response) {
    try {
      const user_id = request.user.id;
      const { name, username, email, location, avatar, bio } = request.body;

      const updateUserService = new UpdateUserService();

      const user = await updateUserService.execute({
        user_id,
        name,
        username,
        email,
        location,
        avatar,
        bio,
      });

      return response.status(200).json(UserView.render(user));
    } catch (err) {
      throw new AppError(err, err.statusCode);
    }
  }

  async delete(request, response) {
    try {
      const user_id = request.user.id;

      const deleteUserService = new DeleteUserService();

      await deleteUserService.execute({ user_id });

      return response.status(204).send();
    } catch (err) {
      throw new AppError(err, err.statusCode);
    }
  }

  async follow(request, response) {
    const follower_id = request.user.id;
    const { followed_id } = request.params;

    const handleFollowService = new HandleFollowService();

    const follow = await handleFollowService.execute({
      followed_id,
      follower_id,
    });

    return response.status(200).json(follow);
  }
}

export default new UserController();
