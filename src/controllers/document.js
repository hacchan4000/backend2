import fs from 'fs';
import path from 'path';
import response from "../utils/response.js";
import { ApiServices } from '../services/api.js';
import NotFoundError from '../exceptions/notFoundError.js';
import redisClient from '../utils/redis.js';

export const documentController = {
  upload: async(req, res, next) => {
    try {

      if (!req.file) {
        return response(res, 400, 'File is required', null);
      }

      const data = {
        user_id: req.user.id,
        file_name: req.file.filename,
        file_url: req.file.path,
      };

      const hasil = await ApiServices.Register('documents', data);

      return response(res, 201, 'Dokumen berhasil diupload', {
        documentId: hasil.id,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
      });

    } catch (error) {
      next(error);
    }
  },

  getDocumentById: async(req, res, next) => {
    try {
      const { id } = req.params;

      const document = await ApiServices.Search('documents', id);

      if (!document) {
        return next(new NotFoundError('Dokumen tidak ditemukan'));
      }

      const filePath = path.resolve(document.file_url);

      if (!fs.existsSync(filePath)) {
        return next(new NotFoundError('File tidak ditemukan'));
      }

      res.setHeader('Content-Type', 'application/pdf');

      res.setHeader(
        'Content-Disposition',
        `inline; filename="${document.file_name}"`
      );

      return res.sendFile(filePath);

    } catch (error) {
      next(error);
    }
  },
  delete: async(req, res, next) => {
  try {
    const { id } = req.params;

    // cari document dulu
    const document = await ApiServices.Search('documents', id);

    if (!document) {
      return response(res, 404, 'Dokumen tidak ditemukan', null);
    }

    // hapus file fisik
    const filePath = path.resolve(document.file_url);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // hapus data database
    const hasil = await ApiServices.Delete('documents', id);

    // hapus cache document
    await redisClient.del(`documents:${id}`);

    return response(res, 200, 'Dokumen berhasil dihapus', hasil);

  } catch (error) {
    next(error);
  }
}
};