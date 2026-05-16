import ClientError from '../exceptions/ClientError.js';

class NotFoundError extends ClientError {
  constructor(pesan){
    super(pesan, 404);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;