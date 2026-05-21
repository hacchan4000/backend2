import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import InvariantError from "../exceptions/invariantError.js";

dotenv.config();

export const TokenManager = {

  generateAccessToken: (payload) => {
    return jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '3h' }
    );
  },

  generateRefreshToken: (payload) => {
    return jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_KEY
    );
  },

  verifyRefreshToken: (refreshToken) => {
    try {
      return jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );

    } catch {
      throw new InvariantError(
        'Refresh token tidak valid'
      );
    }
  },

  verifyToken: (accessToken, secret) => {
    try {

      return jwt.verify(accessToken, secret);

    } catch {
      throw new InvariantError(
        'Access token tidak valid'
      );
    }
  }
}