import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Mostrar todos os users e mostrar outro user não existe em uma aplicação real
router.get('/', loginRequired, userController.index);// mostrar todos
router.get('/:id', userController.show);// mostrar um user

router.post('/', userController.store);// adicionar
router.put('/', loginRequired, userController.update);// modificar dados de um user
router.delete('/', loginRequired, userController.delete);// deletar um user

export default router;

/*
métodos q devem ter no controller, e , consequentemente, no routes (pq ele pega do controller)
index -> lista todos os usuários GET
store/create -> cria um novo usuário POST
delete -> apaga um usuário DELETE
show -> mostra um usuário GET
update -> atualiza um usuário PATCH ou PUT
*/
