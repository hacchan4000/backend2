import response from "../utils/response.js"
import { ApiServices } from '../services/api.js';
import InvariantError from "../exceptions/invariantError.js";
import { nanoid } from "nanoid";

export const documentController = async(req, res, next) => {
  try {
    if (!req.file) {
      return next(new InvariantError('File is required'))
    }

    const data = {
      id: nanoid(16),
      user_id: req.user.id,
      file_name: req.file.filename,
      file_url: req.file.path,
    }

    const hasil = await ApiServices.Register('documents', data);
    return response(res, 201, 'dokumen diupload', hasil)
  } catch (error) {
    next(error)
  }
}