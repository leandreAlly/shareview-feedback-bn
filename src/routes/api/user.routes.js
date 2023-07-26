import { Router } from 'express';
import { loginUser, registerUser } from '../../controllers/user.controller';
import { isEmailExist } from '../../middlewares/user.middlewares';
import validateRegister from '../../validations/user/register.validation';
import validateLogin from '../../validations/user/login.validation';

const router = Router();

router.post('/register', validateRegister, isEmailExist, registerUser);
router.post('/login', validateLogin, loginUser);

export default router;
