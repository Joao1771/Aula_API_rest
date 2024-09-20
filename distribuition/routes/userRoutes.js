"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

// Mostrar todos os users e mostrar outro user não existe em uma aplicação real
// router.get('/', loginRequired, userController.index);// mostrar todos
// router.get('/:id', userController.show);// mostrar um user

router.post('/', _UserController2.default.store);// adicionar
router.put('/', _loginRequired2.default, _UserController2.default.update);// modificar dados de um user
router.delete('/', _loginRequired2.default, _UserController2.default.delete);// deletar um user

exports. default = router;

/*
métodos q devem ter no controller, e , consequentemente, no routes (pq ele pega do controller)
index -> lista todos os usuários GET
store/create -> cria um novo usuário POST
delete -> apaga um usuário DELETE
show -> mostra um usuário GET
update -> atualiza um usuário PATCH ou PUT
*/
