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
  index(req: Request, res: Response) {
    return res.send({ userId: req.userId });
  }

  async findByEmail(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email } = req.body;
    const user = await repository.findOne(
      { email },
      { relations: ['address'] },
    );

    if (!user) {
      return res
        .status(404)
        .send({ message: 'Email de usuário não encontrado' });
    }
    return res.status(200).send({
      user,
    });
  }

  //Busca por CPF ou CNPJ
  async findByCode(req: Request, res: Response) {
    const repository = getRepository(User);
    const { cpf_cnpj } = req.body;
    const user = await repository.findOne({ cpf_cnpj });

    if (!user) {
      return res
        .status(404)
        .send({ message: 'Cpf ou cnpj de usuário não encontrado' });
    }
    return res.status(200).send({
      user,
    });
  }

  async listAll(req: Request, res: Response) {
    const repository = getRepository(User);
    const savedUsers = await repository.find({});
    if (!savedUsers) {
      return res.send(404).send({ message: 'Não há usuários cadastrados' });
    }
    return res.status(200).send({
      savedUsers,
    });
  }

  async listDonee(req: Request, res: Response) {
    const repository = getRepository(User);
    const donees = await repository.find({ where: { type: 'donatario' } });

    if (!donees) {
      return res.send(404).send({ message: 'Não há donatarios cadastrados' });
    }
    return res.status(200).send({
      donees,
    });
  }

  async listDonor(req: Request, res: Response) {
    const repository = getRepository(User);
    const donors = await repository.find({ where: { type: 'doador' } });

    if (!donors) {
      return res.send(404).send({ message: 'Não há doadores cadastrados' });
    }
    return res.status(200).send({
      donors,
    });
  }

  async listActive(req: Request, res: Response) {
    const repository = getRepository(User);
    const activeUsers = await repository.find({ where: { status: 1 } });

    if (!activeUsers) {
      return res
        .send(404)
        .send({ message: 'Não há usuários ativos cadastrados' });
    }
    return res.status(200).send({
      activeUsers,
    });
  }

  async listInactive(req: Request, res: Response) {
    const repository = getRepository(User);
    const inactiveUsers = await repository.find({ where: { status: 0 } });

    if (!inactiveUsers) {
      return res
        .send(404)
        .send({ message: 'Não há usuários inativos cadastrados' });
    }
    return res.status(200).send({
      inactiveUsers,
    });
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
    const token = generateToken(user);

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

    const mailSent = transporter
      .sendMail({
        text: 'Você se cadastrou no DonateHub',
        subject: 'Cadastro DonateHub',
        from: 'Donate Hub <testeteste0301@gmail.com',
        to: [`${user.email}`, 'testeteste0301@gmail.com'],
        html: `
      <html>
      <body>
        <strong>${user.name}, seu cadastro foi realizado com sucesso!   </strong></br>
      </body>
      </html> 
      `,
      })
      .then((info: any) => {
        res.send(mailSent);
      })
      .catch((error: any) => {
        res.send(error);
      });

    return res.status(200).send({
      user: viewUser.render(finalUser),
      token,
      mailSent,
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

    /*
    const token = generateToken(user);
    
    res.status(200).send({
      user: viewUser.render(user),
      token,
    });
    */
    const token = jwt.sign({ id: user.id }, 'secret');

    const mailSent = transporter
      .sendMail({
        text: 'Você se cadastrou no DonateHub',
        subject: 'Login DonateHub',
        from: 'Donate Hub <testeteste0301@gmail.com',
        to: [`${user.email}`, 'testeteste0301@gmail.com'],
        html: `
      <html>
      <body>
        <strong>${user.name}, seu login foi realizado com sucesso!   </strong></br>
      </body>
      </html> 
      `,
      })
      .then((info: any) => {
        res.send(info);
      })
      .catch((error: any) => {
        res.send(error);
      });
    return res.json({
      user: viewUser.render(user),
      token,
    });
  }

  //Update
  async updateUser(req: Request, res: Response) {
    const repository = getRepository(User);
    const id = req.userId;
    console.log(id);
    const user = await repository.update(id as string, req.body);

    if (user.affected === 1) {
      const userUpdated = await repository.findOne(id as string);
      return res.json(userUpdated);
    }

    return response.status(404).json({ message: 'Usuário não encontrado' });
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
