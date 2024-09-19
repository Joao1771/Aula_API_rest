/** @type {import('sequelize-cli').Migration} */
module.exports = { // arquivo criado com comando e modificado
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fotos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      aluno_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'alunos',
          key: 'id',
        },
        onDelete: 'SET NULL', // se a tabela da Fk for alterada seta esse obj para null
        onUpdate: 'CASCADE', // tipo inherit, se a tabela da FK for alterada essa FK tbm será
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }, //      para criar: npx sequelize migration:create --name=create-table-classmate-photo
    }); //                 para executar: npx sequelize db:migrate
  },

  async down(queryInterface) {
    await queryInterface.dropTable('fotos');
  },
};
