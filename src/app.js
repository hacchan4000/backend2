// konfigurasi utama express
import express from 'express';
import { ErrorHandler } from './middlewares/Error.js';
import publicRoutes from './routes/public.js';
import privateRoutes from './routes/private.js';

const app = express();

app.use(express.json()); // ini termasuk middleware bawaan utk mastiin tiap request post/put diakses dr req.body
app.use(express.urlencoded({ extended: true })) // ini utk parsing payload URL-encoded (seperti data form HTML) dan menempatkannya di req.body

/** middleware itu fungsi yg punya akses penuh terhadap req , res n next
  middle ware bisa:
 * Menjalankan kode apapun (misalnya melakukan autentikasi atau logging).
 * Modifikasi objek req atau res (misalnya menambahkan properti baru atau header pada request/response).
 * Mengakhiri siklus request-response (misalnya dengan mengirim respons ke klien).
 * Meneruskan ke middleware berikutnya dengan memanggil fungsi next()
 */

app.use(publicRoutes)
app.use(privateRoutes)
//custom middleware di tingkat app/global
app.use(ErrorHandler)
app.use('/uploads', express.static('src/uploads'));

export default app;