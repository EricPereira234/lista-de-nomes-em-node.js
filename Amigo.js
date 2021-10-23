const Sequelize = require('sequelize');
const conexao = require('./db/db');

const Amigo = conexao.define('amigos', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull: false
    },
    aniversario:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: Sequelize.STRING,
        allowNull: false
    },
    liturgia:{
        type: Sequelize.STRING,
        allowNull: false
    }
});
Amigo.sync({force: false});// sem esse comando não cria
module.exports = Amigo;