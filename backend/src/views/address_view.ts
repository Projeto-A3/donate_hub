import  Address from '@models/Address';


export default {
  render (address: Address) {
    return {
      street: address.street,
      state: address.state,
      zipCode: address.zipCode,
      id: address.id,
    }
  },
};
