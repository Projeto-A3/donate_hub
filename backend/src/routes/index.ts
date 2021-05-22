import { Router } from 'express';
import UserController from '@controllers/UserController';
import DonationsController from '@controllers/DonationsController'
import authMiddleware from '@middlewares/authMiddleware';
import AdminController from '@controllers/AdminController';

const routes = Router();

/**
 * USERS
 */

routes.post('/user', UserController.store);
routes.post('/login', UserController.authenticate);

routes.get('/donations', authMiddleware, DonationsController.listAll)

 //routes.post('/auth', UserController.authenticate);
//routes.get('/users', authMiddleware, UserController.index);

//listagem de usuários
routes.get('/usersList', authMiddleware, UserController.listAll);
routes.get('/doneesList', authMiddleware, UserController.listDonee);
routes.get('/donorsList', authMiddleware, UserController.listDonor);

//busca de usuários via atributo
routes.post('/findByEmail', authMiddleware, UserController.findByEmail);
routes.post('/findByCode', authMiddleware, UserController.findByCode);

//alteração de usuário e endereço
routes.put('/user', authMiddleware, UserController.updateUser);
routes.put('/user/address', authMiddleware, UserController.updateAddress);

//remoção de usuário e endereço
routes.delete('/user', authMiddleware, UserController.removeUser);

// Admins
routes.post('/admin', AdminController.store);
routes.post('/loginAdmin', AdminController.authenticate);


export default routes;
