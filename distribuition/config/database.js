"use strict";require('dotenv').config(); // configurar o .env e importa-lo

module.exports = {
  dialect: 'mariadb',
  host: process.env.DATABASE_HOST, // .env ip do servidor
  port: process.env.DATABASE_PORT, // .env porta do servidor (3306)
  username: process.env.DATABASE_USERNAME, // .env nome do host
  password: process.env.DATABASE_PASSWORD, // .env senha do host (ambos do mariadb)
  database: process.env.DATABASE, // .env nome do banco de dados
  define: {
    timestamps: true,
    underscored: true, // converter camelCase para camel_case
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at', // garantia da conversão
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo', // Importante mudar caso seja de um lugar diferente / Change if timezone differs
};
