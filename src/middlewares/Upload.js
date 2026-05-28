import multer from "multer" // ini library kusus untuk multipart/form-data yaitu req upload file
import InvariantError from '../exceptions/invariantError.js'

const storage = multer.diskStorage({ // ini supaya file yg diupload disimpan di harddisk/folder
  destination: (req, file, cb)=>{ cb(null, 'src/uploads/') }, // fungsi callback cb (error, results) artinya simpan file ke folder uploads
  filename: (req, file, cb)=>{ // ini untuk nentuin nama file spy nama file g sama smwa
    const unik = Date.now() + '-' + file.originalname;
    cb(null, unik);
  }
});

const fileFilter = (req, file, cb) => { // untuk validasi tipe file
  if (file.mimetype != 'application/pdf') {
    return cb(new InvariantError('file harus PDF'), false) // tolak file yg bukan pdf
  }
  cb(null, true) // tidak ad error file diterima
}

export const upload = multer({ // ini middleware multer
  storage,fileFilter,
  limits:{ //utk batasi ukuran upload file
    fileSize: 5 * 1024 * 1024
  }
})