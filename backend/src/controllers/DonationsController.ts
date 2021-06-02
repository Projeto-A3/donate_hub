import User from '@models/User';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Donations from '@models/Donations';
import viewDonations from '@views/donations_view';

class DonationsController {
  index(req: Request, res: Response) {
    return res.send({ donationId: req.donationId });
  }

  async list (req: Request, res: Response) {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne({ where: { id: req.userId }, relations: ['requestDonee', 'requestDonor'] })

    if(!user) {
      return res.status(200).send({ message: 'Usuário não encontrado' })
    }

    return res.status(200).send({
      data: user.type.includes('doador') ? viewDonations.renderMany(user.requestDonor) : viewDonations.render(user.requestDonee)
    })
  }

  async listAll(req: Request, res: Response) {
    const repository = getRepository(Donations);
    const donationsList = await repository.find({ where: { status: 0 }, relations: ['donee']});

    return res.status(200).send({
      data: viewDonations.renderMany(donationsList),
    });
  }

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
    
    return res.status(200).send({ message: 'Pedido realizado com sucesso! Aguarde a confirmação da sua solicitação' })
  }

  //Update
  async updateDonations(req: Request, res: Response) {
    const repository = getRepository(Donations);
    const id = req.donationId;
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
