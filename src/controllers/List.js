import InvariantError from "../exceptions/invariantError.js"
import { ApiServices } from "../services/api.js"
import response from "../utils/response.js"


export const listAll = async (req, res, next) => {
  try {
    const path = req.path.split('/')[1]
  
    const hasil = await ApiServices.List(path)

    if (!hasil) {
      next(new InvariantError('gabisa baca data'))
    }
    return response(res, 200, 'berhasil read data', {[path]: hasil})
  } catch (error) {
    next(error)
  }
  
}