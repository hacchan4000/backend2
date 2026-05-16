import { ApiServices } from '../services/api.js';
import response from '../utils/response.js';

//Controller
export const registerController = async (req, res, next) => {
  try {
    const path = req.path.split('/')[1]
    const result = await ApiServices.Register(`${path}`,req.body)

    return response(res, 201,`berhasil register ${path}`,result)

  } catch (error) {
    next(error)
  }
}

