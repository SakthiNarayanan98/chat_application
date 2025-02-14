const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize, DataTypes);
const Message = require('./message')(sequelize, DataTypes);

User.hasMany(Message);
Message.belongsTo(User);

sequelize.sync({ alter: true });

module.exports = { sequelize, User, Message };
