const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Project = sequelize.define("project", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  thumbnail:{
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  day: {
    type: Sequelize.STRING(11),
  },
  month: {
    type: Sequelize.STRING(11),
  },
  year: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.STRING,
  },
});

module.exports = Project;
