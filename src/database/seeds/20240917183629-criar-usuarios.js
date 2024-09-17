const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          nome: 'Joao',
          email: 'joao@email.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Joao 1',
          email: 'joao1@email.com',
          password_hash: await bcryptjs.hash('1234567', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Joao 2',
          email: 'joao2@email.com',
          password_hash: await bcryptjs.hash('654321', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Joao 3',
          email: 'joao3@email.com',
          password_hash: await bcryptjs.hash('333333', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}, //                           seeds: insere um ou mais objetos "fictício" na db para testes
    );
  },

  down: () => {},
};
