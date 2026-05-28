import multer from "multer" // ini library kusus untuk multipart/form-data yaitu req upload file
import InvariantError from '../exceptions/invariantError.js'

const storage = multer.diskStorage({ // ini supaya file yg diupload disimpan di harddisk/folder
  destination: (req, file, cb)=>{ cb(null, 'src/uploads/') }, // fungsi callback cb (error, results) artinya simpan file ke folder uploads
  filename: (req, file, cb)=>{ // ini untuk nentuin nama file
    const unik = Date.now() + '-' + file.originalname;
    cb(null, unik);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype != 'application/pdf') {
    return cb(new InvariantError('file harus PDF'), false)
  }
  cb(null, true)
}

export const upload = multer({
  storage,fileFilter,
  limits:{
    fileSize: 5 * 1024**2
  }
})