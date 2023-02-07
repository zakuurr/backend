import express from "express";
// import {getOkupasi,getOkupasiById,createOkupasi,updateOkupasi,deleteOkupasi} from "../controllers/OkupasiController.js";
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";
import {getRequest,createRequest,getRequestById,getInvoice,getListRequest,updateApprove,updateReject,getMyRequest} from "../controllers/RequestController.js"
const router = express.Router();

router.get('/request',getRequest);
router.get('/myrequest',getMyRequest);
router.get('/request/:id',getRequestById);
router.post('/request',createRequest);
router.get('/request-invoice',getInvoice);
router.get('/list-request',getListRequest);
router.patch('/request-approve/:id',updateApprove);
router.patch('/request-reject/:id',updateReject);
// router.delete('/okupasi/:id',adminOnly,deleteOkupasi);

export default router;