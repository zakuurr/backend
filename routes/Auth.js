import express from "express";
import { login,Profile,Logout } from "../controllers/Auth.js";
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/login',login);
router.get('/profile',Profile)
router.post('/logout',Logout);

export default router;