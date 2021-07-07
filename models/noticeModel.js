const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Notice = sequelize.define("notice", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  notice: {
    type: Sequelize.TEXT,
  },
});

module.exports = Notice;