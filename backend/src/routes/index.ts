import { Router } from 'express';
import UserController from '@controllers/UserController';
import authMiddleware from '@middlewares/authMiddleware';

const routes = Router();

routes.post('/user', UserController.store);

routes.post('/auth', UserController.authenticate);
routes.get('/users', authMiddleware, UserController.index);

//listagem de usuários
routes.get('/usersList', UserController.listAll);
routes.get('/adminsList', UserController.listAdmin);
routes.get('/doneesList', UserController.listDonee);
routes.get('/donorsList', UserController.listDonor);

//busca de usuários via atributo
routes.post('/findByEmail', UserController.findByEmail);
routes.post('/findByCode', UserController.findByCode);

//alteração de usuário
routes.put('/user/:id', UserController.updateUser);
routes.put('/user/address/:uid', UserController.updateAddress);

export default routes;
