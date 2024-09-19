import Sequelize, { Model } from 'sequelize';

export default class Foto extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Nome do arquivo não pode estar vazio.',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Nome do arquivo não pode estar vazio.',
          },
        },
      },
    }, {
      sequelize, // sequelize: sequelize,
      tableName: 'fotos', // tableName: 'seta o nome da tabela na base de dados'
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
    // this.hasOne(models.Foto); isso no model do Aluno
  }
}
