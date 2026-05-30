import InvariantError from "../exceptions/invariantError.js"
import { ApiServices } from "../services/api.js"
import redisClient from "../utils/redis.js"
import response from "../utils/response.js"


export const listAll = async (req, res, next) => {
  try {
    const path = req.path.split('/')[1]
    const userId = req.user?.id ?? null

    const cacheKey = path === 'bookmarks' ? `${path}:${userId}` : path
    const cache = await redisClient.get(cacheKey);

    if (cache) {
      res.set('X-Data-Source', 'cache');
      return response(res,200,'Berhasil ambil data',JSON.parse(cache));
    }
  
    let hasil;

    if (path === 'bookmarks') {
      hasil = await ApiServices.Search(
        path,{param: 'user_id',id: userId}
      );
    } else {
      hasil = await ApiServices.List(path);
    }

    if (!hasil) {
      res.set('X-Data-Source', 'database');
      return next(new InvariantError('gabisa baca data'))
    }

    const data = {[path]:hasil}

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(data))
    res.set('X-Data-Source', 'database');

    return response(res, 200, 'berhasil read data', data)
  } catch (error) {
    next(error)
  }
  
}