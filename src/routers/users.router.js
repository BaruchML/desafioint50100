import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
// import { roleValidation } from "../middleware/authorization.middleware.js";
const router = Router()
const {
    getUser,
    getUsers,
    createUser,
    updateUserToPremium,
    deleteUser,
    getUsersPremium,
    getDocuments
} = new UserController()
router
    .get('/',getUsers)
    .get('/:uid',getUser)
    .post('/',createUser)
    .put('/:uid',updateUserToPremium)
    .delete('/:uid',deleteUser)
    .get('/premium',getUsersPremium)
    .post('/:uid/documents',getDocuments)

export default router 