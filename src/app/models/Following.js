import { Model } from 'sequelize';

class Following extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'following_id',
      as: 'following',
    });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

module.exports = Following;
