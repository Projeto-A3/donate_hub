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
routes.get('/user', authMiddleware, UserController.index)
routes.post('/login', UserController.authenticate);

// Donations
// routes.get('/donations/:id', DonationsController.getDonations);
routes.post('/donations', authMiddleware, DonationsController.store);
routes.get('/donations', authMiddleware, DonationsController.list);
routes.get('/donations/all', authMiddleware, DonationsController.listAll)
routes.put('/donations/:id', authMiddleware, DonationsController.storeDoner)
//routes.get('/donations/:id', DonationsController.listOne)

 //routes.post('/auth', UserController.authenticate);
//routes.get('/users', authMiddleware, UserController.index);

//alteração de usuário e endereço
routes.put('/user', authMiddleware, UserController.updateUser);
routes.put('/user/address', authMiddleware, UserController.updateAddress);

//remoção de usuário e endereço
routes.delete('/user', authMiddleware, UserController.removeUser);

// Admins
routes.post('/admin', AdminController.store);
routes.post('/loginAdmin', AdminController.authenticate);
routes.put('/toApprove', AdminController.toApprove);
routes.put('/approve/:id', AdminController.approve);

export default routes;
