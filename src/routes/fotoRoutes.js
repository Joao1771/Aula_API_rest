import { Router } from 'express';
// primeiro importa os módulos (tecnologias), depois os internos (q eu criei)
import fotoController from '../controllers/FotoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
//               upload: vai colocar 1 foto enviada pela web (imsomnia) para pasta uploads
router.post('/', loginRequired, fotoController.store);

export default router;
