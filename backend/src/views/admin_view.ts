import Admin from '@models/Administrator';
import Donations from '@models/Donations';
import User from '@models/User';

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
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  },
  renderManyUser (users: User[]) {
    return users.map(this.renderUser)
  },
  renderDonation (donation: Donations) {
    return {
      id: donation.id,
      title: donation.title,
      description: donation.description,
      status: donation.status
    }
  }, 
  renderManyDonation (donations: Donations[]) {
    return donations.map(this.renderDonation)
  }
};
