import response from "../utils/response.js"


export const Validate = (schema) => (req, res, next) => {
 
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  })

  if (error) { 
    return response(res, 400, 'failed to validate', null)
   }
  req.validate = value

  next() // fungsi untuk lanjut ke tahap berikutnya kalo g error di middleware
}




export const validateTable = (tabel) => {
  const allowedTables = [
  'users',
  'companies',
  'categories',
  'jobs',
  'documents',
  'applications',
  'bookmarks',
  'authentications'
];
  if (!allowedTables.includes(tabel)) {
    throw new Error('Invalid table');
  }
};
