/**
 * memang kosong payloadnya bookmark, fitur bookmark ini memang dirancang hanya untuk menyimpan job_id yang berasal dari request paramnya & user_id dari token saja

kira kira skenarionya berarti fitur bookmark ini digunakan untuk menyimpan job_id milik user tertentu, biar nanti bisa di apply terhadap job yang sudah kita simpan di bookmarks
 */

import NotFoundError from "../exceptions/notFoundError.js";
import { ApiServices } from "../services/api.js";
import response from "../utils/response.js";

export const bookmarkController = async(req, res, next) => {
  const { jobId,id } = req.params;
  const userId = req.user.id

  if (req.method === 'GET') {
    const hasil = await ApiServices.Search('bookmarks', id)

    if (!hasil) {
      return next(new NotFoundError('bookmark g ketemu'))
    }

    return response(res, 200, 'bookmark ketemu', hasil)
  }
  if (req.method === 'POST') {
    const result = await ApiServices.Register('bookmarks', { user_id: userId, job_id: jobId })
    return response(res, 201, 'bookmark berhasil ditambah', result)
  } 
  if( req.method === 'DELETE') {
    const deleted = await ApiServices.Delete('bookmarks', { user_id: userId, job_id: jobId })

    if (!deleted) {
      return next( new NotFoundError(
            'bookmark tidak ditemukan'
          )
        );
    }
    return response(res, 200, 'bookmark berhasil dihapus', deleted)
  }
}