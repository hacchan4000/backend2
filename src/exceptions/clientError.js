class ClientError extends Error {
  constructor (pesan, httpCode = 400){
    super(pesan);
    this.name = 'ClientError';
    this.httpCode=httpCode;
  }
}

export default ClientError;