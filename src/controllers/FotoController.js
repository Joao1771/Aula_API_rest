import multer from 'multer'; // multer é usado para uploads, já que o express n suporta
import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig).single('foto'); // multer(configuraçãoDoMulter)

class FotoController {
  async store(req, res) {
    // res.json(req.file); // req.file: informações do arquivo enviado
    return upload(req, res, (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }
      return res.json(req.file);
    });
  }
}

export default new FotoController();
