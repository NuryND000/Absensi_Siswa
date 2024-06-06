import express from "express";
import { verifyToken, AdminOnly } from "../middleware/VerifyToken.js";
import { 
    deleteUser,
    getUser, 
    getUserById,
    saveUser,
    updateUser,
    Login,
    Logout,
    importUser
 } from "../controllers/UserController.js";
 import { refreshToken } from "../controllers/RefreshToken.js";
 import { fileURLToPath } from "url";
 import multer from "multer";
 import path from "path";
 import bodyParser from "body-parser";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use(bodyParser.urlencoded({extended:true}));
router.use(express.static(path.resolve(__dirname, 'public')));

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'./public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

const upload = multer({storage:storage});



router.post('/importUser',upload.single('file'),verifyToken,importUser);
router.get('/users', getUser);
router.get('/users/:id',verifyToken, getUserById);
router.post('/users',verifyToken, AdminOnly, saveUser);
router.patch('/users/:id',verifyToken, AdminOnly, updateUser);
router.delete('/users/:id',verifyToken, AdminOnly, deleteUser);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);


export default router;