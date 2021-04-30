import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Token from '../app/models/Token';
import Follower from '../app/models/Follower';
import Following from '../app/models/Following';
import Repository from '../app/models/Repository';
import Star from '../app/models/Star';

const connection = new Sequelize(databaseConfig);

User.init(connection);
Token.init(connection);
Follower.init(connection);
Following.init(connection);
Repository.init(connection);
Star.init(connection);

User.associate(connection.models);
Token.associate(connection.models);
Follower.associate(connection.models);
Following.associate(connection.models);
Repository.associate(connection.models);
Star.associate(connection.models);

module.exports = connection;
