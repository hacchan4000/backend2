import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TokenManager } from '../utils/token-manager.js';
import response from '../utils/response.js';

dotenv.config()

export const authMiddleware = async(req, res, next) => { 
  try {
    const header = req.headers.authorization;
    
    if (!header) { return res.status(401).json({ status: 'failed',message: 'Token tidak ditemukan' })}

    const user = await TokenManager.verifyToken(header.split('Bearer ')[1], process.env.ACCESS_TOKEN_KEY)
    req.user = user;
    return next()
    
  } catch (error) {
    return response(res, 401, error.message, null);
  }
}

/**
 * try {
    const header = req.headers.authorization;
    
    if (!header) { return res.status(401).json({ status: 'fail',message: 'Token tidak ditemukan' })}

    const token = header.split(' ')[1]
    const accessToken = process.env.ACCESS_TOKEN_KEY
    const decoded = jwt.verify(
      token,
      accessToken
    )
    req.user = decoded;
    next()
    
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      message: 'Token tidak valid'
    });

  }
    npm run migrate create "add-column-owner-to-table-notes"
 */