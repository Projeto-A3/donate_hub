import { Router } from 'express';
import UserController from '@controllers/UserController';
import DonationsController from '@controllers/DonationsController'
import authMiddleware from '@middlewares/authMiddleware';
import AdminController from '@controllers/AdminController';

const routes = Router();

routes.post('/user', UserController.store);
routes.get('/user', authMiddleware, UserController.index)
routes.post('/login', UserController.authenticate);
//alteração de usuário e endereço
routes.post('/user/update', authMiddleware, UserController.updateUser);
//remoção de usuário e endereço
routes.delete('/user', authMiddleware, UserController.removeUser);


// Donations
routes.post('/donations', authMiddleware, DonationsController.store);
routes.get('/donations', authMiddleware, DonationsController.list);
routes.get('/donations/all', authMiddleware, DonationsController.listAll)
routes.put('/donations/:id', authMiddleware, DonationsController.storeDoner)
routes.delete('/donations/:id', authMiddleware, DonationsController.removeDonations)

// Admins
routes.post('/admin/login', AdminController.authenticate);
routes.post('/admin/create', AdminController.store);
routes.get('/admin/listUsers', AdminController.listUsers)
routes.get('/admin/listDonates', AdminController.listDonates)
routes.post('/admin/approve/:id', AdminController.updateDonate);

export default routes;
