import Request from '@models/Request';

export default {
  render(request: Request) {
    return {
      id: request.id,
      title: request.title,
      description: request.description,
      dueDate: request.dueDate,
    };
  },
};
