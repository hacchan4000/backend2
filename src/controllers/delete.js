import NotFoundError from "../exceptions/notFoundError.js";
import { ApiServices } from "../services/api.js";
import redisClient from "../utils/redis.js";
import response from "../utils/response.js";


export const deleteController = async(req, res, next) => {
  try {
      const { id } = req.params
      const path = req.path.split('/')[1]
      const hasil = await ApiServices.Delete(path,id)

      
      if (!hasil) {
        return next(new NotFoundError('id g ketemu'));
      }
      if (path === 'companies') {
          await redisClient.del(`companies:${id}`);
          await redisClient.del(`companies`);
      }

      if (path === 'bookmarks') {
          await redisClient.del(
            `bookmarks:${hasil.user_id}`
          );
      }
  
      return response(res, 200,`berhasil hapus ${path}`,hasil)
  
    } catch (error) {
      next(error)
    }
}