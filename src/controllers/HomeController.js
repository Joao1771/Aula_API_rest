import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Maria',
      sobrenome: 'Miranda',
      email: 'maria@email.com',
      idade: 26,
      peso: 57,
      altura: 1.5,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
