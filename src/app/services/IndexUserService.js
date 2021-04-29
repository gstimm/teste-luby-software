import User from '../models/User';

class IndexUserService {
  async execute() {
    const users = await User.findAll();

    return users;
  }
}

module.exports = IndexUserService;
