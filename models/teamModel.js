const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Team = sequelize.define("member", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  post: {
    type: Sequelize.STRING,
  },
  thumbnail:{
    type: Sequelize.STRING,
  },
  facebook: {
    type: Sequelize.STRING,
  },
  instagram: {
    type: Sequelize.STRING,
  },
  twitter: {
    type: Sequelize.STRING,
  },
  linkedin: {
    type: Sequelize.STRING,
  },
});

module.exports = Team;