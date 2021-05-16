import { getRepository } from 'typeorm';
import Order from '@models/Request';
import { Request, Response } from 'express';
import viewRequest from '@views/request_view';

import authConfig from '@config/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class RequestController {
  index(req: Request, res: Response) {
    return res.send({requestId: req.requestId});
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(Order);

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
      request: viewRequest.render(finalRequest)
      
    });
  }
}
