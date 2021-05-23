import Admin from '@models/Administrator';


export default {
  render (admin: Admin) {
    return {
      email: admin.email,
      id: admin.id,
      status: admin.type,
    }
  },
};
