/**
 * memang kosong kak payloadnya, fitur bookmark ini memang dirancang hanya untuk menyimpan job_id yang berasal dari request paramnya & user_id dari token saja

kira kira skenarionya berarti fitur bookmark ini digunakan untuk menyimpan job_id milik user tertentu, biar nanti bisa di apply terhadap job yang sudah kita simpan di bookmarks
 */

export const bookmarkController = (req, res, next) => {
  const { jobId } = req.params;
  const { id } = req.params;

  if (id) {
    
  }
}