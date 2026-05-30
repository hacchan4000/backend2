import ClientError from './clientError.js';

class NotFoundError extends ClientError {
  constructor(pesan){
    super(pesan, 404);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;