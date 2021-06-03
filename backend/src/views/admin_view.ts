import Admin from '@models/Administrator';
import Donations from '@models/Donations';
import User from '@models/User';
import donations_view from './donations_view';

export default {
  render (admin: Admin) {
    return {
      name: admin.name,
      surname: admin.surname,
      email: admin.email,
      id: admin.id,
      type: admin.type,
    }
  },
  renderUser (user: User) {
    return {
      email: user.email,
      id: user.id,
      birthDate: user.birthDate,
      dependents: user.dependents,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      type: user.type,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  },
  renderManyUser (users: User[]) {
    return users.map(this.renderUser)
  },
  renderDonation (donation: Donations) {
    return donations_view.render(donation)
  }, 
  renderManyDonation (donations: Donations[]) {
    return donations.map(this.renderDonation)
  }
};
