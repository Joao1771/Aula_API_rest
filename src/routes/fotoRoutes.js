import { Router } from 'express';
import multer from 'multer';

import fotoController from '../controllers/FotoController';
import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig); // multer(configuraçãoDoMulter)

const router = new Router();
//               upload: vai colocar 1 foto enviada pela web (imsomnia) para pasta uploads
router.post('/', upload.single('foto'), fotoController.store);

export default router;
