"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      // retorna quais atributos?
      attributes: ['id', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
      // em qual ordem? por número de id, DESCrescente
      include: {
        model: _Foto2.default,
        attributes: ['originalname', 'filename'],
      },
    });
    res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }
      const aluno = await _Aluno2.default.findByPk(id, {
        // retorna quais atributos?
        attributes: ['id', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
        // em qual ordem? por número de id, DESCrescente
        include: {
          model: _Foto2.default,
          attributes: ['originalname', 'url', 'filename'],
        },
      });
      if (!aluno) {
        return res.status(400).json({
          errors: ['Person does not exist'],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }
      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Person does not exist'],
        });
      }
      await aluno.destroy();
      return res.json('Deleted');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }
      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno) {
        return res.status(400).json({
          errors: ['Person does not exist'],
        });
      }

      const novoAluno = await aluno.update(req.body);
      return res.json(novoAluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new AlunoController();
