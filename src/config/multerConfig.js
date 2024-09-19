import multer from 'multer'; // multer é usado para uploads, já que o express n suporta
import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);
export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG'));
    }
    //         cb: callback
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => { // define o destino (por isso importar o path.resolve)
      cb(null, resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => { // define o nome com o milissegundo atual
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    }, //       // aleatorio para nunca ter 2 iguais // extname: extensão do arq
  }),
};
