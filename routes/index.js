import express from 'express'
import { validateRegister, validateLogin } from '../utils/validators/auth.js';
import { registerController } from '../controllers/RegisterController.js';
import { loginController } from '../controllers/LoginController.js';
import { findAllUser } from '../controllers/user/FindAllUser.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', validateRegister, registerController)
router.post('/login', validateLogin, loginController)

// parameter verifyToken bertujuan untuk memeriksa ke valid-an token.
router.get('/admin/users', verifyToken, findAllUser)

export default router