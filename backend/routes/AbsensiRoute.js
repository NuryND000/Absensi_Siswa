import express from "express";
import { 
    deleteAbsensi,
    getAbsensi,
    getAbsensiById,
    getAbsensiByKelasTanggal,
    saveAbsensi,
    updateAbsensi 
} from "../controllers/AbsensiController.js";
import { verifyToken, AdminOnly } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/absensis', getAbsensi);
router.get('/laporan/:id/:tanggal', getAbsensiByKelasTanggal);
router.get('/absensis/:id', getAbsensiById);
router.post('/absensis', verifyToken, saveAbsensi);
router.patch('/absensis/:id', verifyToken, updateAbsensi);
router.delete('/absensis/:id', verifyToken, deleteAbsensi);



export default router;