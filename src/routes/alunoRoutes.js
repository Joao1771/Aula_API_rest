import { Router } from 'express';
import alunoController from '../controllers/AlunoController';

const router = new Router();

router.get('/', alunoController.index); // alunoController.index é o q carrega a página

export default router;
