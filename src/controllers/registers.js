import InvariantError from '../exceptions/invariantError.js';
import { ApiServices } from '../services/api.js';
import redisClient from '../utils/redis.js';
import response from '../utils/response.js';

//Controller
export const registerController = async (req, res, next) => {
  try {
    const path = req.path.split('/')[1]
    let payload = req.body;
    
    if (path === 'companies' || path === 'categories' || path === 'applications') {
     payload = {
        ...req.body,
        user_id: req.user.id
      };
     
    }
    const result = await ApiServices.Register(`${path}`,payload)

    if (path === 'applications') {

      await redisClient.del(
        `applications:user_id:${result.user_id}`
      );
      await redisClient.del(
        `applications:job_id:${result.job_id}`
      );
    }

    if (path === 'companies' || path === 'categories') {
      await redisClient.del(`${path}`);
    }

    if (path === 'bookmarks') {
      await redisClient.del(
        `bookmarks:${hasil.user_id}`
      );
    }
        
    return response(res, 201,`${path} berhasil ditambahkan`,result)

  } catch (error) {
    if (error.code === '23505') {

      return next(new InvariantError('Gagal menambahkan user. email sudah digunakan')) 
    }
    next(error)

  }
}

