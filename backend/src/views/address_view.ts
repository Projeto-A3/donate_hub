import  Address from '@models/Address';


export default {
  render (address: Address) {
    const {
      additionalDetails,
      city,
      district,
      id,
      number,
      state,
      street,
      zipCode,
    } = address
    return {
      additionalDetails,
      city,
      district,
      id,
      number,
      state,
      street,
      zipCode
    }
  },
};
