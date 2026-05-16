import { ApiServices } from "../services/api.js";
import response from "../utils/response.js";

export const searchId = async (req, res, next) => {
  try {
    const { id } = req.params
    const path = req.path.split('/')[1]
    const hasil = await ApiServices.Search(path,id)

    return response(res, 201,`berhasil nyari ${path}`,hasil)

  } catch (error) {
    next(error)
  }
}

export const searchIdComplex = async (req, res, next) => {
  
}

