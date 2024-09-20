"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer); // multer é usado para uploads, já que o express n suporta
var _path = require('path');

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);
exports. default = {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new _multer2.default.MulterError('Arquivo precisa ser PNG ou JPG'));
    }
    //         cb: callback
    return cb(null, true);
  },
  storage: _multer2.default.diskStorage({
    destination: (req, file, cb) => { // define o destino (por isso importar o path.resolve)
      cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => { // define o nome com o milissegundo atual
      cb(null, `${Date.now()}_${aleatorio()}${_path.extname.call(void 0, file.originalname)}`);
    }, //       // aleatorio para nunca ter 2 iguais // extname: extensão do arq
  }),
};
