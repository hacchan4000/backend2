import Joi from "joi"

export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const authSchema = Joi.object({

})
/**
 * (schema) => (req, res, next) itu bisa diartikan kaya:
 * function ValidateData(schema) {
    return function(req, res, next) {}
  } 
    jd perlu param schema
 */
export const ValidateUser = (schema) => (req, res, next) => {
 
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  })

  if (error) { return next(error) }
  req.validate = value

  next() // fungsi untuk lanjut ke tahap berikutnya kalo g error di middleware
}

export const ValidateAuth = (schema) => (req, res ,next) => {
  
}

export const validateTable = (tabel) => {
  const allowedTables = [
  'users',
  'companies',
  'categories',
  'jobs',
  'documents',
  'applications',
  'bookmarks'
];
  if (!allowedTables.includes(tabel)) {
    throw new Error('Invalid table');
  }
};
