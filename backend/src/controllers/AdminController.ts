import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import viewAdmin from '@views/admin_view';

import authConfig from '@config/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '@models/Administrator';
import Donations from '@models/Donations';
import User from '@models/User';
const nodemailer = require('nodemailer');
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
const generateToken = (admin: Admin) => {
  const { secret, expiresIn } = authConfig;
  return jwt.sign({ id: admin.id }, secret, { expiresIn });
};

class AdminController {
  index(req: Request, res: Response) {
    return res.send({adminId: req.userId});
  }

  async listUsers (req: Request, res: Response) {
    const repository = getRepository(User)
    const all = await repository.find()
    return res.status(200).send(viewAdmin.renderManyUser(all))
  }
  
  async listDonates (req: Request, res: Response) {
    const repository = getRepository(Donations)
    const all = await repository.find()

    return res.status(200).send(viewAdmin.renderManyDonation(all))
  }

  async authenticate(req: Request, res: Response) {
    const repository = getRepository(Admin);
    const { email, password } = req.body;
    const admin = await repository.findOne({
      where: { email }
    });

    if (!admin) {
      return res.status(401).send({ message: 'E-mail ou senha inválidas' });
    }
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).send({ message: 'E-mail ou senha inválidas' });
    }
    
    const token = generateToken(admin)

    try {
      if(JSON.parse(process.env.MAILER_SENT_EMAIL || 'false')) {
        await transporter.sendMail({
          text: "Você se cadastrou no DonateHub",
          subject: "Login DonateHub",
          from: `Donate Hub <${process.env.MAILER_EMAIL}>`,
          to: [`${admin.email}`, `${process.env.MAILER_EMAIL}`],
          html: `
          <html>
          <body>
            <strong>${admin.name}, seu login foi realizado com sucesso!   </strong></br>
          </body>
          </html> 
          `,
        })
      }
    } catch {
      
    }

    return res.json({
      user: viewAdmin.render(admin),
      token,
    });
  }
  async listAll (req: Request, res: Response) {
    const repository = getRepository(Admin);
    const savedAdmins = await repository.find({});
    if (!savedAdmins){
      return res.send(404).send({message: "Não há admins cadastrados"});
    }
    return res.status(200).send({
      savedAdmins,
    });
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(Admin);

    const {
     name,
     surname, 
     email,
     password,
    } = req.body;

    const adminExists = await repository.findOne({ email });
    if (adminExists ) {
      return res.status(409).send({ message: 'Usuário já existe' });
    }

    const admin = repository.create({
     name,
     surname, 
     email,
     password,
    });
    await repository.save(admin);
    const token = generateToken(admin);

    const finalAdmin = await repository.findOneOrFail({
      where: { id: admin.id },
    });

    try {
      if(JSON.parse(process.env.MAILER_SENT_EMAIL || 'false')) {
        await transporter.sendMail({
          text: "Você se cadastrou no DonateHub",
          subject: "Cadastro DonateHub",
          from: `Donate Hub <${process.env.MAILER_EMAIL}>`,
          to: [`${admin.email}`, `${process.env.MAILER_EMAIL}`],
          html: `
          <html>
          <body>
            <strong>${admin.name}, seu cadastro de Administrador foi realizado com sucesso!   </strong></br>
          </body>
          </html> 
          `,
        })
      }
    } catch {
      
    }

    return res.status(200).send({
      admin: viewAdmin.render(finalAdmin),
      token,
    });
  }

  async toApprove(req: Request, res: Response) {
    const repository = getRepository(Donations);
    const donationsList = await repository.find({where :{ status: 0}});
    if (!donationsList){
      return res.send(404).send({message: "Não há pedidos pendentes de aprovação"});
    }
    return res.status(200).send({
      donationsList,
    });
  }

  async approve(req:Request, res: Response) {
    const repository = getRepository(Donations);
  
    const donationId = req.params as unknown as number ;
  

    const donation = await repository.update(donationId, {status:1})
    console.log(donationId)
    return res.send(donation)
    
  }

}

export default new AdminController