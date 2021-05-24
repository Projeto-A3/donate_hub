import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import viewAdmin from '@views/admin_view';

import authConfig from '@config/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '@models/Administrator';

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
    
    const token = jwt.sign({ id: admin.id }, 'secret');

    const mailSent = transporter.sendMail({
      text: "Você se cadastrou no DonateHub",
      subject: "Login DonateHub",
      from: "Donate Hub <testeteste0301@gmail.com",
      to: ["eduardomoraeslima1@gmail.com", "testeteste0301@gmail.com"],
      html: `
      <html>
      <body>
        <strong>${admin.name}, seu login foi realizado com sucesso!   </strong></br>
      </body>
      </html> 
      `,
    }).then((info: any) =>{
        res.send(info)
    }).catch((error: any) =>{
      res.send(error);  
    });
    return res.json({
      admin: viewAdmin.render(admin),
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
     type
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
     type
    });
    await repository.save(admin);
    const token = generateToken(admin);

    const finalAdmin = await repository.findOneOrFail({
      where: { id: admin.id },
    });

    const mailSent = transporter.sendMail({
      text: "Você se cadastrou no DonateHub",
      subject: "Cadastro DonateHub",
      from: "Donate Hub <testeteste0301@gmail.com",
      to: ["eduardomoraeslima1@gmail.com", "testeteste0301@gmail.com"],
      html: `
      <html>
      <body>
        <strong>${admin.name}, seu cadastro de Administrador foi realizado com sucesso!   </strong></br>
      </body>
      </html> 
      `,
    }).then((info: any) =>{
        res.send(info)
    }).catch((error: any) =>{
      res.send(error);  
    });

    return res.status(200).send({
      admin: viewAdmin.render(finalAdmin),
      token,
    });
  }
}

export default new AdminController