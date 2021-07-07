const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const ProjectImage = sequelize.define("projectImage", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  file: {
    type: Sequelize.STRING,
  },
});

module.exports = ProjectImage;
