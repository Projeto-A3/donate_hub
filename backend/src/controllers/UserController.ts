import { getRepository} from 'typeorm';
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
  index(req: Request, res: Response) {
    return res.send({ userId: req.userId });
  }

  /*async store(req: Request, res: Response) {

    const repository = getRepository(User);
    
    const { type, name, surname, email, password, cpf_cnpj, phone, birthDate, dependents} = req.body;

    const userExists = await repository.findOne({ email });
    if (userExists) {
      return res.status(409).send({ message: 'Usuário já existe' });
    }
  
    const user = repository.create({ name, surname, email, password, cpf_cnpj, phone, birthDate, type, dependents });
    await repository.save(user);
    const token = generateToken(user);

    
    const addressRepository = getRepository(Address);
    const { address: { street, number, additionalDetails, district, city, state, zipCode } } = req.body;

    const address = addressRepository.create({ street, number, additionalDetails, district, city, state, zipCode, user });
    await addressRepository.save(address);

    const finalUser = await repository.findOneOrFail({ where: { id: user.id }, relations: ['address'] })

    return res.status(200).send({
      user: viewUser.render(finalUser),
      token,
    });
  }*/

 

  async list(req: Request, res: Response){
    const repository = getRepository(User)
    const savedUsers = await repository.find({})
   
    return res.status(200).send({
      savedUsers
    });
  }

  async listAdmin(req: Request, res: Response){
    const repository = getRepository(User)
    const admins = await repository.find({where: { type: "admin" }})
   
    const finalUser = await repository.findOneOrFail({  })
    return res.status(200).send({
      admins
    });
  }

  async listDonee(req: Request, res: Response){
    const repository = getRepository(User)
    const donees = await repository.find({where: { type: "donatario" }})
   
    const finalUser = await repository.findOneOrFail({  })
    return res.status(200).send({
      donees
    });
  }

  
  async listDonor(req: Request, res: Response){
    const repository = getRepository(User)
    const donors = await repository.find({where: { type: "doador" }})
   
    const finalUser = await repository.findOneOrFail({  })
    return res.status(200).send({
      donors
    });
  }
  async store(req: Request, res: Response) {

    const repository = getRepository(User);
    
    const { type, name, surname, email, password, cpf_cnpj, phone, birthDate, dependents} = req.body;

    const userExists = await repository.findOne({ email });
    if (userExists) {
      return res.status(409).send({ message: 'Usuário já existe' });
    }
  
    const user = repository.create({ name, surname, email, password, cpf_cnpj, phone, birthDate, type, dependents });
    await repository.save(user);
    const token = generateToken(user);

    
    const addressRepository = getRepository(Address);
    const { address: { street, number, additionalDetails, district, city, state, zipCode } } = req.body;

    const address = addressRepository.create({ street, number, additionalDetails, district, city, state, zipCode, user });
    await addressRepository.save(address);

    const finalUser = await repository.findOneOrFail({ where: { id: user.id }, relations: ['address'] })

    return res.status(200).send({
      user: viewUser.render(finalUser),
      token,
    });
  }
  async authenticate (req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;
    const user = await repository.findOne({ where: { email }, relations: ['address'] });
    if(!user) {
      return res.status(401).send({ message: 'E-mail ou senha inválidas' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
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

    return res.json({
      user: viewUser.render(user),
      token,
    });
  }
  
  /*async update(req: Request, res: Response){
    const repository = getRepository(User);
    const { email } = req.body;
    try {
      const user_alte
    } catch (error) {
      
    }
  }*/

}

export default new UserController();
