import { Router } from 'express';
import {
  loginUser,
  registerUser,
  updateVerfiedUser,
} from '../../controllers/user.controller';
import {
  checkIfTokenRevoked,
  isEmailExist,
  verifyAndRevokeToken,
} from '../../middlewares/user.middlewares';
import validateRegister from '../../validations/user/register.validation';
import validateLogin from '../../validations/user/login.validation';

const router = Router();

router.post('/register', validateRegister, isEmailExist, registerUser);
router.post('/login', validateLogin, loginUser);
router.get(
  '/verify-email/:token',
  checkIfTokenRevoked,
  verifyAndRevokeToken,
  updateVerfiedUser,
);

export default router;
