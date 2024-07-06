import express from 'express'
import { validateRegister, validateLogin } from '../utils/validators/auth.js';
import { registerController } from '../controllers/RegisterController.js';
import { loginController } from '../controllers/LoginController.js';

const router = express.Router();

router.post('/register', validateRegister, registerController)
router.post('/login', validateLogin, loginController)

export default router