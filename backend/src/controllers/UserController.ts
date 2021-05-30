import { getRepository } from 'typeorm';
import { Request, response, Response } from 'express';
import User from '@models/User';
import Address from '@models/Address';
import viewUser from '@views/user_view';
import authConfig from '@config/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
const generateToken = (user: User) => {
  const { secret, expiresIn } = authConfig;
  return jwt.sign({ id: user.id }, secret, { expiresIn });
};

class UserController {
  async index(req: Request, res: Response) {
    const id = req.userId
    const repository = getRepository(User);
    const user = await repository.findOne({ where: { id }, relations: ['address'] })
    if(!user) {
      return res.status(404).send({ message: 'Usuário não encontrado'})
    }
    return res.status(200).send({
      user: viewUser.render(user)
    })
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(User);

    const {
      type,
      name,
      surname,
      email,
      password,
      cpf_cnpj,
      phone,
      birthDate,
      dependents,
    } = req.body;

    const userExists = await repository.findOne({ email });
    if (userExists) {
      return res.status(409).send({ message: 'Usuário já existe' });
    }
    const cpfExists = await repository.findOne({ cpf_cnpj });
    if (cpfExists) {
      return res.status(409).send({ message: 'CPF/CNPJ já existe' });
    }

    const user = repository.create({
      name,
      surname,
      email,
      password,
      cpf_cnpj,
      phone,
      birthDate,
      type,
      dependents,
    });
    await repository.save(user);

    const addressRepository = getRepository(Address);
    const {
      address: {
        street,
        number,
        additionalDetails,
        district,
        city,
        state,
        zipCode,
      },
    } = req.body;

    const address = addressRepository.create({
      street,
      number,
      additionalDetails,
      district,
      city,
      state,
      zipCode,
      user,
    });
    await addressRepository.save(address);

    const finalUser = await repository.findOneOrFail({
      where: { id: user.id },
      relations: ['address'],
    });


    let emailSent = false

    try {
      if(JSON.parse(process.env.MAILER_SENT_EMAIL || '')) {
        await transporter
        .sendMail({
          text: 'Você se cadastrou no DonateHub',
          subject: 'Cadastro DonateHub',
          from: `Donate Hub <${process.env.MAILER_EMAIL}>`,
          to: [`${user.email}`, `${process.env.MAILER_EMAIL}`],
          html: `
        <html>
        <body>
          <strong>${user.name}, seu cadastro foi realizado com sucesso!</strong></br>
        </body>
        </html> 
        `,
        })
        emailSent = true
      }
      
    } catch (error) {
      
    }

    const token = generateToken(user)

    return res.status(200).send({
      user: viewUser.render(finalUser),
      token,
      emailSent
    });
  }

  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;
    const user = await repository.findOne({
      where: { email },
      relations: ['address'],
    });
    if (!user) {
      return res.status(401).send({ message: 'E-mail ou senha inválidas' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: 'E-mail ou senha inválidas' });
    }

    const token = generateToken(user)

    try {
      if(JSON.parse(process.env.MAILER_SENT_EMAIL || ''))  {
        await transporter
        .sendMail({
          text: 'Você se cadastrou no DonateHub',
          subject: 'Login DonateHub',
          from: `Donate Hub <${process.env.MAILER_EMAIL}>`,
          to: [`${user.email}`, `${process.env.MAILER_EMAIL}`],
          html: `
        <html>
        <body>
          <strong>${user.name}, seu login foi realizado com sucesso! </strong></br>
        </body>
        </html> 
        `,
        })
      }
    } catch (error) {
      
    }
    
    return res.json({
      user: viewUser.render(user),
      token,
    });
  }

  //Update
  async updateUser(req: Request, res: Response) {
    const repository = getRepository(User);
    const id = req.userId;
    const { address, phone, dependents } = req.body
    
    const user = await repository.findOne({ where: { id }})

    if(!user) {
      return res.status(404).send({ message: 'Usuário não encontrado' })
    }

    const updateUser = await repository.update(id as string, { address, phone, dependents });
    
    if (updateUser.affected === 1) {
      return res.status(200).json({ message: 'Dados atualizados com sucesso!' });
    }

    return response.status(400).json({ message: 'Usuário não pode atualizar os dados' });
  }

  async updateAddress(req: Request, res: Response) {
    const repository = getRepository(Address);
    const uid = req.userId as string;

    const idAddress = await repository
      .createQueryBuilder('add')
      .where('add.userId = :uid', { uid: uid })
      .getOne();

    if (idAddress) {
      await repository.update(idAddress.id, req.body);

      const addressUpdated = await repository.findOne(idAddress);
      return res.json(addressUpdated);
    }
    return response.status(404).json({ message: 'Endereço não encontrado' });
  }

  async removeUser(req: Request, res: Response) {
    const repository = getRepository(User);
    const id = req.userId as string;

    const user = await repository.delete(id);

    if (user.affected === 1) {
      const userUpdated = await repository.findOne(id);
      return res.json({ message: 'Usuário removido' });
    }

    return response.status(404).json({ message: 'Usuário não encontrado' });
  }
}

export default new UserController();
