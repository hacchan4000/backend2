import Joi from "joi"

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const putAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
export const deleteAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});



export const Validate = (schema) => (req, res, next) => {
 
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  })

  if (error) { return next(error) }
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
  'bookmarks'
];
  if (!allowedTables.includes(tabel)) {
    throw new Error('Invalid table');
  }
};
