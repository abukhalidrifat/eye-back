const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Slider = sequelize.define("slide", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  heading: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  thumbnail:{
    type: Sequelize.STRING,
  },
});

module.exports = Slider;