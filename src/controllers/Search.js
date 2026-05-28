import NotFoundError from "../exceptions/notFoundError.js";
import { ApiServices } from "../services/api.js";
import redisClient from "../utils/redis.js";
import response from "../utils/response.js";


export const searchId = async (req, res, next) => {
  try {
    const { id } = req.params
    const path = req.path.split('/')[1]

    const cacheKey = `${path}:${id}`
    const cache = await redisClient.get(cacheKey);
    
    if (cache) {
      res.set('X-Data-Source', 'cache');
      return response(response, 200, 'data dr cache', JSON.parse(cache))
    }

    const hasil = await ApiServices.Search(path,id)
    await redisClient.setEx(cacheKey, 3600, JSON.parse(cache))

    if (!hasil) {
      return next(new NotFoundError('Gagal mencari user'))
    }

    return response(res, 200,`berhasil nyari ${path}`,hasil)

  } catch (error) {
    next(error)
  }
}

export const searchIdComplex = async (req, res, next) => {
  try {
    const route = req.path.split('/')

    const tabel = route[1];
    const kolom = route[2];
    const id = route[3];

    let param = ''
    switch (kolom) {
      case 'company':
        param = 'company_id'
        break;
      case 'category':
        param = 'category_id'
        break;
      case 'user':
        param = 'user_id'
        break;
      case 'job':
        param = 'job_id'
        break;
      default:
        break;
    }
    const hasil = await ApiServices.Search(tabel,{ param, id })
    if (!hasil || hasil.length === 0) {
      return next(response(res, 200, 'id g valid', { [tabel]:hasil }))
    }

    return response(res, 200,`berhasil nyari ${tabel}`, {[tabel]:hasil })
  } catch (error) {
    next(error)
  }
}

