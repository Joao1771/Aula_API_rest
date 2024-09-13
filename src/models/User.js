import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';// Quem faz o hash: pega a senha e cria "criptografia"

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: { // Validator
          len: {
            args: [3, 255],
            msg: 'Nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: { // unique: Não pode ter outro igual
          msg: 'Email já existe',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      password_hash: { // senha "criptografada"
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: { // Senha que o usuario digita
        type: Sequelize.VIRTUAL, // VIRTUAL: Não armazenada no Data Base
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'Senha deve ter entre 6 e 50 caracteres',
          },
        },
      },
    }, {
      sequelize, // Executa o sequelize (ATM: "ponte" que une Data Base com POO)
    }); //   Escrever aqui e no MySQL é muito diferente, por isso o ATM (aumenta produtividade)

    this.addHook('beforeSave', async (user) => { // antes de salvar ele confere a senha e faz o hash (criptar)
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    return this; // retorna a classe
  }

  passwordValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
