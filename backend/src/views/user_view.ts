import User from '@models/User';

export default {
  render (user: User) {
    return {
      email: user.email,
      id: user.id,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  },
};
