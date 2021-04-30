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
    this.hasMany(models.Star, { foreignKey: 'user_id', as: 'stars_given' });
    this.hasMany(models.Repository, {
      foreignKey: 'user_id',
      as: 'repositories',
    });
    this.hasMany(models.Follower, {
      foreignKey: 'user_id',
      as: 'followers',
    });
    this.hasMany(models.Following, {
      foreignKey: 'user_id',
      as: 'followings',
    });
  }
}

module.exports = User;
