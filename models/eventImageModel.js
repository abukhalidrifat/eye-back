const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const EventImage = sequelize.define("eventImage", {
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

module.exports = EventImage;
