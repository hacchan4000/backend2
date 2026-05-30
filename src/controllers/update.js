import NotFoundError from "../exceptions/notFoundError.js";
import { ApiServices } from "../services/api.js";
import redisClient from "../utils/redis.js";
import response from "../utils/response.js";


export const updateController = async (req, res, next) => {
  try {
    const { id } = req.params
    const path = req.path.split('/')[1]
    const hasil = await ApiServices.Update(path,id, req.body)

    if (!hasil) {
      return next(new NotFoundError('id g ketemu'));
    }
    if (path === 'applications') {

      await redisClient.del(
        `applications:user_id:${hasil.user_id}`
      );

      await redisClient.del(
        `applications:job_id:${hasil.job_id}`
      );
    }

    return response(res, 200,`berhasil update ${path}`,hasil)

  } catch (error) {
    next(error)
  }
}
