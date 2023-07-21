import { Router } from 'express';
import { registerUser } from '../../controllers/user.controller';
import { isEmailExist } from '../../middlewares/user.middlewares';
import validateRegister from '../../validations/user.validation';

const router = Router();

router.post('/register', validateRegister, isEmailExist, registerUser);

export default router;
