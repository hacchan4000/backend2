import { ClientError } from '../exceptions/index.js'
import response from "../utils/response.js"


export const ErrorHandler = (err, req, res, next) => {
  if (err instanceof ClientError) {
    return response(res, err.httpCode, err.message, null)
  }

  if (err.isJoi) {
    return response(res, 400, err.details[0].message, null)
  }
  
  const status = err.httpCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
 
  console.error('Unhandled error:', err);
  return response(res, status, message, null);
}

