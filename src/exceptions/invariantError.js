import ClientError from './clientError.js';

class InvariantError extends ClientError {
  constructor(pesan){
    super(pesan);
    this.name = 'InvariantError';
  }
}

export default InvariantError;