import { Router } from 'express';
import UserController from '@controllers/UserController';
import DonationsController from '@controllers/DonationsController'
import authMiddleware from '@middlewares/authMiddleware';

const routes = Router();

/**
 * USERS
 */

routes.post('/user', UserController.store);
routes.post('/login', UserController.authenticate);


routes.get('/donations', authMiddleware, DonationsController.listAll)

// routes.post('/auth', UserController.authenticate);
// routes.get('/users', authMiddleware, UserController.index);

//listagem de usuários
// routes.get('/usersList', UserController.listAll);
// routes.get('/adminsList', UserController.listAdmin);
// routes.get('/doneesList', UserController.listDonee);
// routes.get('/donorsList', UserController.listDonor);

//busca de usuários via atributo
// routes.post('/findByEmail', UserController.findByEmail);
// routes.post('/findByCode', UserController.findByCode);

//alteração de usuário e endereço
// routes.put('/user/:id', UserController.updateUser);
// routes.put('/user/address/:uid', UserController.updateAddress);

//remoção de usuário e endereço
// routes.delete('/user/:id', UserController.removeUser);
//routes.delete('/user/:id', UserController.removeAddresses);

export default routes;
