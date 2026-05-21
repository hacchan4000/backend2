import AuthenticationError from "../exceptions/authError.js";
import InvariantError from "../exceptions/invariantError.js";
import { ApiServices } from "../services/api.js";
import response from "../utils/response.js";
import { TokenManager } from "../utils/token-manager.js";


export const authController = {
  login: async(req, res, next) => {
    try {
      const { email, password } = req.validate;
      const userId = await ApiServices.Search('users', { email, password }) // verifikasi user's credetial

      if (!userId) {
        return next(new AuthenticationError('Kredensial yang Anda berikan salah'))
      }
      const accessToken = TokenManager.generateAccessToken({ id: userId})
      const refreshToken = TokenManager.generateRefreshToken({ id: userId})

      await ApiServices.Register('authentications', {token: refreshToken})

      return response(res, 201, 'Authentication berhasil ditambahkan', { accessToken,refreshToken })
    } catch (error) {
      next(error);
    }
    
  },
  refresh: async(req, res, next) => {
    const { refreshToken } = req.validate;

    const result = await ApiServices.Search('authentications', refreshToken)
    if (!result) {
      return next(new InvariantError('Refresh token tidak valid'));
    }

    const { id } = TokenManager.verifyRefreshToken(refreshToken)
    const newAccessToken = TokenManager.generateAccessToken({ id })

    return response(res, 200, 'Access Token berhasil diperbarui', { newAccessToken })
  },
  logout: async (req, res, next) => {
    const { refreshToken } = req.validate;
    const result = await ApiServices.Search('authentications', refreshToken)

    if (!result) {
      return next(new InvariantError('Refresh token tidak valid'));
    }

    await ApiServices.Delete('authentications', refreshToken);
    return response(res, 200, 'Refresh token berhasil dihapus');
  }
}