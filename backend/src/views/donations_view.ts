import Donations from '@models/Donations';

export default {
  render(donation: Donations) {
    return {
      id: donation.id,
      title: donation.title,
      description: donation.description,
      status: donation.status,
      donee: donation.donee && {
        name: donation.donee.name,
        phone: donation.donee.phone,
        email: donation.donee.email
      },
      donor: donation.donor && {
        name: donation.donor.name,
        phone: donation.donor.phone,
        email: donation.donor.email
      }
    };
  },
  renderMany (donations: Donations[]) {
    return donations.map(this.render)
  },
};
