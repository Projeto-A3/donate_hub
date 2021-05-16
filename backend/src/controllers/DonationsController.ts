import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import viewDonations from '@views/donations_view';

import authConfig from '@config/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Donations from '@models/Donations';

class DonationsController {
  index(req: Request, res: Response) {
    return res.send({requestId: req.requestId});
  }

  listAll (req: Request, res: Response) {
    return res.status(200).send([
      {
        id: 0,
        title: 'Teste',
        description: 'Descrição',
        userId: req.userId,
      },
      {
        id: 1,
        title: 'Teste 1',
        description: 'Descrição 2',
        userId: req.userId
      }
    ])
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(Donations);

    const {
      title,
      description,
      dueDate,
    } = req.body;

    const request = repository.create({
      title,
      description,
      dueDate,
    });

    await repository.save(request);

    const finalRequest = await repository.findOneOrFail({
      where: { id: request.id },
    });

    return res.status(200).send({
      request: viewDonations.render(finalRequest)
      
    });
  }
}

export default new DonationsController