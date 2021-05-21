import { getRepository, createConnection } from 'typeorm';
import { Request, Response } from 'express';
import Donations from '@models/Donations';
import viewDonations from '@views/donations_view';

import authConfig from '@config/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class DonationsController {
  index(req: Request, res: Response) {
    return res.send({requestId: req.requestId});
  }

  async listAll (req: Request, res: Response) {
    const repository = getRepository(Donations);
    const donationsList = await repository.find();

    return res.status(200).send({
      donationsList,
    })
  }

  /*async getDonations (req: Request, res: Response){
    const repository = getRepository(Donations);
    const donationsId = await repository.find({where: { id: "" }});
    
    return res.status(200).send({
      donationsId,
    })
    
  }*/
  
  async store(req: Request, res: Response) {
    const repository = getRepository(Donations);
    
    const {
      title,
      description,
      dueDate,
    } = req.body;

    const donationsExists = await repository.findOne({ title });
    if(donationsExists){
      return res.status(409).send({ message: 'Solicitação já realizada' });
    }

    const donations = repository.create({
      title,
      description,
      dueDate,
    });

    await repository.save(donations);

    const finalDonations = await repository.findOneOrFail({
      where: { id: donations.id },
    });

    return res.status(200).send({
      request: viewDonations.render(finalDonations)
      
    });
  }

  //Update
  
}

export default new DonationsController();