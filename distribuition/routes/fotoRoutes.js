"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
// primeiro importa os módulos (tecnologias), depois os internos (q eu criei)
var _FotoController = require('../controllers/FotoController'); var _FotoController2 = _interopRequireDefault(_FotoController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();
//               upload: vai colocar 1 foto enviada pela web (imsomnia) para pasta uploads
router.post('/', _loginRequired2.default, _FotoController2.default.store);

exports. default = router;
