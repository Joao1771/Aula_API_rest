import jwt from 'jsonwebtoken'; // middleware que fica entre o acesso e a db e pode bloquear
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers; // header no insomnia com authorization

  if (!authorization) { // status 401 = Não autorizado
    return res.status(401).json({
      errors: ['Login required'],
    });
  }
  //   Bearer gsjha...       separar por espaço
  const [, token] = authorization.split(' ');

  try { //      jsonwebtoken verifica se é valido
    const dados = jwt.verify(token, process.env.TOKEN_SECRET); // .env token
    const { id, email } = dados;
    const user = await User.findOne({ // Isso caso o email do user seja alterado após o token,
      where: { //                        necessitando de outro token porque o email mudou
        id, email, //                    (precisar de email é o que login por sessão faz)
      },
    });
    if (!user) {
      return res.status(401).json({
        errors: ['Usuário errado'],
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
