import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Token from '../app/models/Token';

const connection = new Sequelize(databaseConfig);

User.init(connection);
Token.init(connection);

User.associate(connection.models);
Token.associate(connection.models);

module.exports = connection;
