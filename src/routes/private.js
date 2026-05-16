
import express from 'express';
import { authMiddleware } from '../middlewares/Auth.js';
import { registerController } from "../controllers/registers.js"
import { listAll } from '../controllers/List.js';
import { profileController } from '../controllers/profile.js';
import { updateController } from '../controllers/update.js';
import { deleteController } from '../controllers/delete.js';
import { documentController } from '../controllers/document.js';
import { authController } from '../controllers/auth.js';
import { searchId, searchIdComplex } from '../controllers/Search.js';
import { bookmarkController } from '../controllers/bookmark.js';


const privateRoutes = express.Router()

// Profile
privateRoutes.get('/profile', authMiddleware, profileController) // → Get logged-in user profile
privateRoutes.get('/profile/applications', authMiddleware, profileController) // → Get my applications
privateRoutes.get('/profile/bookmarks', authMiddleware, profileController) // → Get my bookmarks

// Companies
privateRoutes.post('/companies', authMiddleware, registerController) // → Create company
privateRoutes.put('/companies/:id', authMiddleware, updateController) // → Update company
privateRoutes.delete('/companies/:id', authMiddleware, deleteController) // → Delete company

// Categories
privateRoutes.post('/categories', authMiddleware, registerController) // → Create category
privateRoutes.put('/categories/:id', authMiddleware, updateController) // → Update category
privateRoutes.delete('/categories/:id', authMiddleware, deleteController) // → Delete category

// Jobs
privateRoutes.post('/jobs', authMiddleware, registerController) // → Create job
privateRoutes.put('/jobs/:id', authMiddleware, updateController) // → Update job
privateRoutes.delete('/jobs/:id', authMiddleware, deleteController) // → Delete job

// App
privateRoutes.post('/applications', authMiddleware, registerController) // → Apply for job
privateRoutes.get('/applications', authMiddleware,listAll) // → List all applications
privateRoutes.get('/applications/:id', authMiddleware, searchId) // → Get application detail
privateRoutes.get('/applications/user/:userId', authMiddleware,searchIdComplex) // → Applications by user
privateRoutes.get('/applications/job/:jobId', authMiddleware,searchIdComplex) // → Applications by job
privateRoutes.put('/applications/:id', authMiddleware, updateController) // → Update application status
privateRoutes.delete('/applications/:id', authMiddleware, deleteController) // → Delete application

// Bookmarks
privateRoutes.post('/jobs/:jobId/bookmark', authMiddleware,bookmarkController) // → Create bookmark for a job
privateRoutes.get('/jobs/:jobId/bookmark/:id', authMiddleware,bookmarkController) // → Get bookmark detail
privateRoutes.delete('/jobs/:jobId/bookmark', authMiddleware,bookmarkController) // → Delete bookmark by user and job
privateRoutes.get('/bookmarks', authMiddleware, listAll) // → Get all bookmarks for logged-in user

// Documents
privateRoutes.post('/documents', authMiddleware ,documentController) // → Upload document (multipart/form-data)
privateRoutes.delete('/documents/:id', authMiddleware ,documentController)

// Auth
privateRoutes.delete('/authentications', authController.logout)

export default privateRoutes;
