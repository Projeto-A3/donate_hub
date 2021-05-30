import Donations from '@models/Donations';
import user_view from '@views/user_view';

export default {
  render(donation: Donations) {
   /* if(!donation.donee&& !donation.donor){
      return { 
        id: donation.id,
        title: donation.title,
        description: donation.description,
        status: donation.status,
      }
    }
    if(donation.donee&& !donation.donor){
        return { 
          id: donation.id,
          title: donation.title,
          description: donation.description,
          status: donation.status,
          donee: user_view.render(donation.donee)
      }  
    }*/
    return {
      id: donation.id,
      title: donation.title,
      description: donation.description,
      status: donation.status
    };
  },
  renderMany (donations: Donations[]) {
    return donations.map(this.render)
  }
};
