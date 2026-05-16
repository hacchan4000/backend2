class ClientError extends Error {
  constructor (pesan, httpCode = 400){
    super(pesan);
    this.name = 'clientError';
    this.httpCode=httpCode;
  }
}

export default ClientError;