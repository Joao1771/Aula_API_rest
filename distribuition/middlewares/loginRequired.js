"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken); // middleware que fica entre o acesso e a db e pode bloquear
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers; // header no insomnia com authorization

  if (!authorization) { // status 401 = Não autorizado
    return res.status(401).json({
      errors: ['Login required'],
    });
  }
  //   Bearer gsjha...       separar por espaço
  const [, token] = authorization.split(' ');

  try { //      jsonwebtoken verifica se é valido
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET); // .env token
    const { id, email } = dados;
    const user = await _User2.default.findOne({ // Isso caso o email do user seja alterado após o token,
      where: { //                        necessitando de outro token porque o email mudou
        id,
        email, //                    (fica similar ao que login por sessão faz)
      },
    });
    if (!user) {
      return res.status(401).json({
        errors: ['Token e email não batem'], // para eu saber se o email foi trocado
      });
    }
    req.userId = id;
    req.userEmail = email;
    return next(); // next para passar do middleware
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
