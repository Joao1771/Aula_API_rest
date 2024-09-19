/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn( // editar uma coluna
      'alunos', // tabela alunos
      'email', // coluna email
      {
        type: Sequelize.STRING,
        allowNull: false, // não poder ser null
        unique: true, // torna email único
      },
    );
  }, //   Essa migration é uma alteração no modelo (model) do objeto aluno.email

  down: () => { }, // para criar: npx sequelize migration:create --name=mudar-email-aluno-unique
}; //                 para executar: npx sequelize db:migrate
// obs: caso ele não consiga tornar único vai dar um erro de validação e a migration não executa
