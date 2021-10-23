const Sequelize = require('sequelize');

const conexao = new Sequelize('cv', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conexao;