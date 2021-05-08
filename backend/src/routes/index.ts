import { Router } from 'express';
import UserController from '@controllers/UserController';
import authMiddleware from '@middlewares/authMiddleware';

const routes = Router();

routes.post('/user', UserController.store);
//routes.put('/user/:id', UserController.update);
routes.post('/auth', UserController.authenticate);
routes.get('/users', authMiddleware, UserController.index);

//listagem de usuarios
routes.get('/usersList', UserController.list);
routes.get('/adminsList', UserController.listAdmin);
routes.get('/doneesList', UserController.listDonee);
routes.get('/donorsList', UserController.listDonor);

export default routes;
