const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  thumbnail:{
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: 'guest'
  },
});

module.exports = User;