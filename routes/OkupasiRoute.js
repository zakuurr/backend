import express from "express";
import {getOkupasi,getOkupasiById,createOkupasi,updateOkupasi,deleteOkupasi} from "../controllers/OkupasiController.js";
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";
import {body} from 'express-validator'
const router = express.Router();

router.get('/okupasi',getOkupasi);
router.get('/okupasi/:id',getOkupasiById);
router.post('/okupasi',createOkupasi);
router.patch('/okupasi/:id',updateOkupasi);
router.delete('/okupasi/:id',deleteOkupasi);

export default router;