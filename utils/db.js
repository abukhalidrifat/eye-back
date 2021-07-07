const Sequelize = require('sequelize');

const sequelize = new Sequelize('eyedb','root','',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;