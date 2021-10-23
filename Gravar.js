const Sequelize = require('sequelize');
const conexao = require('./db/db');

const Gravar = conexao.define('contribuintes', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    mes:{
        type: Sequelize.STRING,
        allowNull: false
    }
});
Gravar.sync({force: false});// sem esse comando não cria
module.exports = Gravar;