import { Router } from 'express';
import UserController from '@controllers/UserController';
import DonationsController from '@controllers/DonationsController'
import authMiddleware from '@middlewares/authMiddleware';
import AdminController from '@controllers/AdminController';

const routes = Router();
/*const nodemailer = require('nodemailer');
const SMTP_CONFIG = require('@config/smtp');
const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: false,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 * USERS
 */
routes.post('/user', UserController.store);
routes.post('/login', UserController.authenticate);

// Donations
// routes.get('/donations/:id', DonationsController.getDonations);
routes.post('/donations', DonationsController.store);
routes.get('/donations', DonationsController.listAll)
//routes.get('/donations/:id', DonationsController.listOne)

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
