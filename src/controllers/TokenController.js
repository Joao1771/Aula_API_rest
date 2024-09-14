import jwt from 'jsonwebtoken'; // tecnologia para criação de tokens
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;
    //      se não for enviado fica vazio (falsy)
    if (!email || !password) {
      return res.status(401).json({
        errors: ['Coloque um email e senha'],
      });
    }

    const user = await User.findOne({ where: { email } }); // procurar email no obj user

    if (!user) { //    unauthorized
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    if (!(await user.passwordValid(password))) {
      return res.status(401).json({
        errors: ['Senha incorreta'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, { // .env do token
      expiresIn: process.env.TOKEN_EXPIRATION, // .env do tempo para token expirar
    });
    return res.json({ token }); // { "token": "token" }
  }
}

export default new TokenController(); // exportar o objeto inteiro
