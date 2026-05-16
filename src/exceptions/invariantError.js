import ClientError from '../exceptions/ClientError.js';

class InvariantError extends ClientError {
  constructor(pesan){
    super(pesan);
    this.name = 'InvariantError';
  }
}

export default InvariantError;