import AuthenticateUserService from '../services/AuthenticateUserService';
import CreateUserService from '../services/CreateUserService';
import IndexUserService from '../services/IndexUserService';
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
      throw new AppError(err);
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
      throw new AppError(err);
    }
  }

  async index(request, response) {
    const indexUserService = new IndexUserService();
    const users = await indexUserService.execute();

    return response.status(200).json({ users: UserView.renderMany(users) });
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

      return response.status(200).json(user);
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default new UserController();
