import InvariantError from '../exceptions/invariantError.js';
import { ApiServices } from '../services/api.js';
import response from '../utils/response.js';

//Controller
export const registerController = async (req, res, next) => {
  try {
    const path = req.path.split('/')[1]
    const result = await ApiServices.Register(`${path}`,req.validated)
    
    return response(res, 201,`User berhasil ditambahkan`,result)

  } catch (error) {
    if (error.code === '23505') {

      return next(new InvariantError('Gagal menambahkan user. email sudah digunakan')) 
    }
    next(error)

  }
}

