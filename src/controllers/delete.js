import NotFoundError from "../exceptions/notFoundError.js";
import { ApiServices } from "../services/api.js";
import response from "../utils/response.js";

export const deleteController = async(req, res, next) => {
  try {
      const { id } = req.params
      const path = req.path.split('/')[1]
      const hasil = await ApiServices.Delete(path,id)

      
      if (!hasil) {
        return next(new NotFoundError('id g ketemu'));
      }
  
      return response(res, 200,`berhasil hapus ${path}`,hasil)
  
    } catch (error) {
      next(error)
    }
}