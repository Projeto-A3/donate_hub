import Donations from '@models/Donations';

export default {
  render(request: Donations) {
    return {
      id: request.id,
      title: request.title,
      description: request.description
    };
  },
  renderMany (donations: Donations[]) {
    return donations.map(this.render)
  }
};
