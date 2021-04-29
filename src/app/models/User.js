import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        location: Sequelize.STRING,
        avatar: Sequelize.STRING,
        bio: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );
  }
}

export default User;
