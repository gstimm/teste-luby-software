import CreateRepositoryService from '../services/CreateRepositoryService';
import DeleteRepositoryService from '../services/DeleteRepositoryService';
import HandleStarService from '../services/HandleStarService';
import IndexRepositoryService from '../services/IndexRepositoryService';
import ShowRepositoryService from '../services/ShowRepositoryService';
import UpdateRepositoryService from '../services/UpdateRepositoryService';
import RepositoryView from '../views/RepositoryView';
import AppError from '../errors/AppError';

class RepositoryController {
  async store(request, response) {
    try {
      const user_id = request.user.id;
      const { name, description, is_public } = request.body;

      const createRepositoryService = new CreateRepositoryService();

      const repository = await createRepositoryService.execute({
        name,
        description,
        is_public,
        user_id,
      });

      return response.status(201).json(RepositoryView.render(repository));
    } catch (err) {
      throw new AppError(err, err.statusCode);
    }
  }

  async index(request, response) {
    try {
      const indexRepositoryService = new IndexRepositoryService();

      const repositories = await indexRepositoryService.execute();

      return response.status(200).json(RepositoryView.renderMany(repositories));
    } catch (err) {
      throw new AppError(err, err.statusCode);
    }
  }

  async show(request, response) {
    try {
      const { repository_id } = request.params;

      const showRepositoryService = new ShowRepositoryService();

      const repository = await showRepositoryService.execute({ repository_id });

      return response.status(200).json(RepositoryView.renderDetail(repository));
    } catch (err) {
      throw new AppError(err, err.statusCode);
    }
  }

  async update(request, response) {
    try {
      const user_id = request.user.id;

      const { repository_id } = request.params;

      const { name, description, is_public } = request.body;

      const updateRepositoryService = new UpdateRepositoryService();

      const repository = await updateRepositoryService.execute({
        user_id,
        repository_id,
        name,
        description,
        is_public,
      });

      return response.status(200).json(RepositoryView.render(repository));
    } catch (err) {
      throw new AppError(err, err.statusCode);
    }
  }

  async delete(request, response) {
    try {
      const user_id = request.user.id;

      const { repository_id } = request.params;

      const deleteRepositoryService = new DeleteRepositoryService();

      await deleteRepositoryService.execute({
        repository_id,
        user_id,
      });

      return response.status(204).send();
    } catch (err) {
      throw new AppError(err, err.statusCode);
    }
  }

  async star(request, response) {
    try {
      const user_id = request.user.id;

      const { repository_id } = request.params;

      const handleStarService = new HandleStarService();

      const star = await handleStarService.execute({
        user_id,
        repository_id,
      });

      return response.status(200).json(star);
    } catch (err) {
      throw new AppError(err, err.statusCode);
    }
  }
}

export default new RepositoryController();
