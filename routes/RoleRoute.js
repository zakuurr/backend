import express from "express";
import {getRole,getRoleById,createRole,updateRole,deleteRole} from "../controllers/RoleController.js";
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/role',getRole);
router.get('/role/:id',getRoleById);
router.post('/role',createRole);
router.patch('/role/:id',updateRole);
router.delete('/role/:id',deleteRole);

export default router;