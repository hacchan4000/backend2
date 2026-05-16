import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const authMiddleware = (req, res, next) => { 
  try {
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
}