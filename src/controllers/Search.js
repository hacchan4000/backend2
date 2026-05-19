import NotFoundError from "../exceptions/notFoundError.js";
import { ApiServices } from "../services/api.js";
import response from "../utils/response.js";

export const searchId = async (req, res, next) => {
  try {
    const { id } = req.params
    const path = req.path.split('/')[1]
    const hasil = await ApiServices.Search(path,id)

    if (!hasil) {
      return next(new NotFoundError('Gagal mencari user'))
    }

    return response(res, 200,`berhasil nyari ${path}`,hasil)

  } catch (error) {
    next(error)
  }
}

export const searchIdComplex = async (req, res, next) => {
  
}

