import express from "express"
import { loginSchema, putAuthenticationPayloadSchema, userSchema, Validate } from "../middlewares/Validasi.js"
import { registerController } from "../controllers/registers.js"
import { searchId, searchIdComplex } from "../controllers/Search.js"
import { listAll } from "../controllers/List.js"
import { authController } from "../controllers/auth.js"

/**
 * flow app
 * Routes -> Controller -> Services -> Repo -> Database
 */
const publicRoutes = express.Router()
//Routes

// Users
publicRoutes.post('/users', Validate(userSchema), registerController)
publicRoutes.get('/users/:id', searchId)

//companies
publicRoutes.get('/companies', listAll)
publicRoutes.get('/companies/:id', searchId)

//categories
publicRoutes.get('/categories', listAll)
publicRoutes.get('/categories/:id', searchId)

//jobs
publicRoutes.get('/jobs', listAll)
publicRoutes.get('/jobs/:id', searchId)
publicRoutes.get('/jobs/company/:companyId', searchIdComplex)
publicRoutes.get('/jobs/category/:categoryId', searchIdComplex)

//auth
publicRoutes.post('/authentications', Validate(loginSchema), authController.login)
publicRoutes.put('/authentications', Validate(putAuthenticationPayloadSchema), authController.refresh)

//docs
publicRoutes.get('/documents', listAll)
publicRoutes.get('/documents/:id', searchId)

export default publicRoutes
