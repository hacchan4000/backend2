import NotFoundError from "../exceptions/notFoundError.js";
import { ApiServices } from "../services/api.js";
import response from "../utils/response.js";

export const updateController = async (req, res, next) => {
  try {
    const { id } = req.params
    const path = req.path.split('/')[1]
    const hasil = await ApiServices.Update(path,id, req.body)

    if (!hasil) {
      next(new NotFoundError('id g ketemu'));
    }

    return response(res, 200,`berhasil update ${path}`,hasil)

  } catch (error) {
    next(error)
  }
}
