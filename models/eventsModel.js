const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Event = sequelize.define("event", {
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
  venue: {
    type: Sequelize.STRING,
  },
  hour: {
    type: Sequelize.STRING(11),
  },
  minute: {
    type: Sequelize.STRING(11),
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

module.exports = Event;
