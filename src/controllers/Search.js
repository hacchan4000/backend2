import { ApiServices } from "../services/api.js";
import redisClient from "../utils/redis.js";
import response from "../utils/response.js";


export const searchId = async (req, res, next) => {
  try {

    const { id } = req.params;
    const tabel = req.path.split('/')[1];

    const cacheKey = `${tabel}:${id}`;

    // cek redis
    const cache = await redisClient.get(cacheKey);

    // =========================
    // CACHE HIT
    // =========================
    if (cache) {

      res.set('X-Data-Source', 'cache');

      return response(
        res,
        200,
        'Berhasil ambil data',
        JSON.parse(cache)
      );
    }

    const result = await ApiServices.Search(tabel, id);
    if (!result) {
      return response(res,404,'Data tidak ditemukan',null)
    }

    await redisClient.setEx(
      cacheKey,
      3600,
      JSON.stringify(result)
    );

    res.set('X-Data-Source', 'database');

    return response(
      res,
      200,
      'Berhasil ambil data',
      result
    );

  } catch (error) {
    next(error);
  }
};
export const searchIdComplex = async (req, res, next) => {
  try {

    const route = req.path.split('/');

    const tabel = route[1];
    const kolom = route[2];
    const id = route[3];

    let param = '';

    switch (kolom) {
      case 'company':
        param = 'company_id';
        break;

      case 'category':
        param = 'category_id';
        break;

      case 'user':
        param = 'user_id';
        break;

      case 'job':
        param = 'job_id';
        break;

      default:
        return response(
          res,
          400,
          'Kolom tidak valid',
          null
        );
    }

    const cacheKey = `${tabel}:${param}:${id}`;

    // =========================
    // CACHE HIT
    // =========================
    const cache = await redisClient.get(cacheKey);

    if (cache) {

      res.set('X-Data-Source', 'cache');

      return response(
        res,
        200,
        `Berhasil mencari ${tabel}`,
        JSON.parse(cache)
      );
    }

    // =========================
    // DATABASE
    // =========================
    const hasil = await ApiServices.Search(
      tabel,
      { param, id }
    );

    if (!hasil || hasil.length === 0) {

      res.set('X-Data-Source', 'database');

      return response(
        res,
        200,
        'Data tidak ditemukan',
        { [tabel]: [] }
      );
    }

    // BENTUK DATA DISAMAKAN
    const data = { [tabel]: hasil };

    // =========================
    // SAVE TO REDIS
    // =========================
    await redisClient.setEx(
      cacheKey,
      3600,
      JSON.stringify(data)
    );

    res.set('X-Data-Source', 'database');

    return response(
      res,
      200,
      `Berhasil mencari ${tabel}`,
      data
    );

  } catch (error) {
    next(error);
  }
};
