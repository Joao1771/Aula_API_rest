"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken); // tecnologia para criação de tokens
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;
    //      se não for enviado fica vazio (falsy)
    if (!email || !password) {
      return res.status(401).json({
        errors: ['Coloque um email e senha'],
      });
    }

    const user = await _User2.default.findOne({ where: { email } }); // procurar email no obj user

    if (!user) { //    unauthorized
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha incorreta'],
      });
    }

    const { id } = user;
    const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, { // .env do token
      expiresIn: process.env.TOKEN_EXPIRATION, // .env do tempo para token expirar
    });
    return res.json({ token }); // { "token": "token" }
  }
}

exports. default = new TokenController(); // exportar o objeto inteiro
