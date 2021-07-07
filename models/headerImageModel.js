const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const HeaderImage = sequelize.define("headerImage", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  project: {
    type: Sequelize.STRING,
  },
  event: {
    type: Sequelize.STRING,
  },
  notice: {
    type: Sequelize.STRING,
  },
  team: {
    type: Sequelize.STRING,
  },
  about: {
    type: Sequelize.STRING,
  },
});

module.exports = HeaderImage;
