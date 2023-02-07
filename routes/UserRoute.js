import express from "express";
import {getUsers,getUsersById,createUser,updateUser,deleteUser,getMyProfile} from "../controllers/UsersController.js";
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users',getUsers);
router.get('/profile-user',getMyProfile);
router.get('/users/:id',getUsersById);
router.post('/users',createUser);
router.patch('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);

export default router;