import User from '@models/User';
import { getRepository, createConnection } from 'typeorm';
import { Request, Response } from 'express';
import Donations from '@models/Donations';
import viewDonations from '@views/donations_view';

import authConfig from '@config/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class DonationsController {
  index(req: Request, res: Response) {
    return res.send({ donationId: req.donationId });
  }

  async list (req: Request, res: Response) {
    const userRepository = getRepository(User)
    const repository = getRepository(Donations);
    const user = await userRepository.findOne({ where: { id: req.userId } })

    if(!user) {
      return res.status(200).send({ message: 'Usuário não encontrado' })
    }

    const donations = user.type.includes('doador') ? await repository.find({ where: { donor: user }}) : await repository.find({ where: { donee: user }})

    return res.status(200).send(donations)
  }

  async listAll(req: Request, res: Response) {
    const repository = getRepository(Donations);
    const donationsList = await repository.find();

    return res.status(200).send({
      donationsList,
    });
  }

  /*async getDonations (req: Request, res: Response){
    const repository = getRepository(Donations);
    const donationsId = await repository.find({where: { id: "" }});
    
    return res.status(200).send({
      donationsId,
    })
    
  }*/

  async storeDoner (req: Request, res: Response ) {
    const userRepository = getRepository(User);
    const repository = getRepository(Donations);
    const { id } = req.params
    const { userId } = req

    const donation = await repository.findOne({ where: { id }})
    const user = await userRepository.findOne({ where: { id: userId }})
    
    if(!user || user.type.includes('donatario') || !donation) {
      return res.status(404).send({ message: 'Erro ao atualizar' })
    }

    const updateDonation = await repository.update(id, { donor: user })

    if(updateDonation.affected === 1) {
      return res.status(200).send({ message: 'Obrigado por ajudar o próximo' })
    }

    return res.status(404).send({ message: 'Erro ao atualizar' })
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(Donations);
    const userRepository = getRepository(User);
    let { title, description, dueDate } = req.body;

    const user = await userRepository.findOne({ where: { id: req.userId }, relations: ['requestDonee']})
    const descExists = await userRepository.findOne({ where: { description: description }})
    
    if(descExists){
      return res.status(409).send({ message: 'Já existe uma solicitação com a mesma descrição!' })
    }
    if(!user) {
      return res.status(200).send({ message: 'Usuário não encontrado' })
    }

    if(user.requestDonee) {
      return res.status(409).send({ message: 'Já existe uma solicitação em aberto' })
    }

    const donations = repository.create({
      title,
      description,
      dueDate,
      donee: user,
    });

    await repository.save(donations);
    
    return res.status(200).send({ message: 'Aguarde a confirmação da sua solicitação' })

    // let donations = repository.create({
    //   title,
    //   description,
    //   dueDate,
    //   donee: user,
    // });

    // await repository.save(donations);

   // const donee = userRepo.create({
    //  id: 'cf09bf21-d53b-48ea-9fa5-60413a41c2bd',
    //});

    // const donee = userRepository.create({
    //   id: req.userId as string,
    // });
    // const donationExists = await repository.findOne({ where: {doneeId:donee.id}});
    // if (donationExists) {
    //   return res.status(409).send({ message: 'Usuário já tem um pedido cadastrado' });
    // }
    // let donations = repository.create({
    //   title,
    //   description,
    //   dueDate,
    //   donee,
    // });
  
    // await repository.save(donations);

    // const finalDonations = await repository.findOneOrFail({
    //   where: { id: donations.id },
    //   relations: ['donee'],
    // });

    // return res.status(200).send({
    //   donations: viewDonations.render(finalDonations),
    //   finalDonations,
    // });
  }

  //Update
  async updateDonations(req: Request, res: Response) {
    const repository = getRepository(Donations);
    const id = req.donationId;
    console.log(id);
    const donations = await repository.update(id as string, req.body);

    if (donations.affected === 1) {
      const donationsUpdated = await repository.findOne(id as string);
      return res.json(donationsUpdated);
    }

    return res.status(404).json({ message: 'Ajuda não encontrada' });
  }

  //Delete
  async removeDonations(req: Request, res: Response) {
    const repository = getRepository(Donations);
    const id = req.donationId as string;

    const donations = await repository.delete(id);

    if (donations.affected === 1) {
      const updateDonations = await repository.findOne(id);
      return res.json({ message: 'Solicitação de ajuda removida' });
    }

    return res.status(404).json({ message: 'Ajuda não encontrada' });
  }
}

export default new DonationsController();
