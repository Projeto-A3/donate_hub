import User from '@models/User';
import address_view from './address_view';

export default {
  render (user: User) {
    return {
      email: user.email,
      id: user.id,
      birthDate: user.birthDate,
      cpf_cnpj: user.cpf_cnpj,
      dependents: user.dependents,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      type: user.type,
      address: address_view.render(user.address),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  },
};
