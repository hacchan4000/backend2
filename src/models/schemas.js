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


export const companySchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
});
export const categorySchema = Joi.object({
  name: Joi.string().required(),
});
export const jobSchema = Joi.object({
  company_id:Joi.string().required(),
  category_id:Joi.string().required(),
  title:Joi.string().required(),
  description:Joi.string().required(),
  job_type:Joi.string().required(),
  experience_level:Joi.string().required(),
  location_type:Joi.string().required(),
  is_salary_visible:Joi.boolean().required(),
  status:Joi.string().required(),
});
export const applicationSchema = Joi.object({
  user_id: Joi.string().required(),
  job_id: Joi.string().required(),
  status: Joi.string().required(),
});
export const bookmarkSchema = Joi.object({
  user_id: Joi.string().required(),
  job_id: Joi.string().required(),
});
export const authSchema = Joi.object({
  token: Joi.string().required(),
});