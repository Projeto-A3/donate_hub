import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import User from '@models/User';
import Address  from '@models/Address';
import viewUser from '@views/user_view';
import authConfig from '@config/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (user: User)=>{
  const { secret, expiresIn } = authConfig
  return jwt.sign({ id: user.id }, secret, { expiresIn })
}

class UserController {
  async store(req: Request, res: Response) {
    const repository2 = getRepository(Address);
    const { street, number, additionalAddress, district, city, state, zipCode} = req.body;

    const add1 = await repository2.create({street, number, additionalAddress, district, city, state, zipCode});
    
    const createdA = await repository2.save(add1);

    
    const repository = getRepository(User);
    const { type, name, surname, email, password, cpf_cnpj, phone, birthDate, dependents } = req.body;
    
    const userExists = await repository.findOne({ email });
    if (userExists) {
      return res.status(409).send({ message: 'Usuário já existe' });
    }
  
    const user = repository.create({ name, surname, email, password, cpf_cnpj, phone, birthDate, type, dependents});
    await repository.save(user);
    const token = generateToken(user);

    return res.status(200).send({
      user: viewUser.render(user),
      token,
    });
  }

  async authenticate (req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;
    const user = await repository.findOne({ email });
    if(!user) {
      return res.status(401).send({ message: 'E-mail ou senha inválidas' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
      return res.status(401).send({ message: 'E-mail ou senha inválidas' });
    }

    const token = generateToken(user);
    
    res.status(200).send({
      user: viewUser.render(user),
      token,
    });
  }
}

export default new UserController();
