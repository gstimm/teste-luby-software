import { DataTypes, Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        location: DataTypes.STRING,
        avatar: DataTypes.STRING,
        bio: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Token, { foreignKey: 'user_id', as: 'tokens' });
  }
}

module.exports = User;
