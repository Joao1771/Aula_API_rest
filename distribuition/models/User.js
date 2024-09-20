"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize); // Quem faz a conexão entre o SQL e o JS
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);// Quem faz o hash: pega a senha e cria "criptografia"

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: { // Validator
          len: {
            args: [3, 255],
            msg: 'Nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: { // unique: Não pode ter outro igual
          msg: 'Email já existe',
        },
        validate: {
          isEmail: { // validação básica de email
            msg: 'Email inválido',
          },
        },
      },
      password_hash: { // senha "criptografada"
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      password: { // Senha que o usuario digita
        type: _sequelize2.default.VIRTUAL, // VIRTUAL: Não armazenada no Data Base
        defaultValue: '',
        validate: {
          len: { // lenght tamanho
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
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });
    return this; // retorna a classe
  }

  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;
