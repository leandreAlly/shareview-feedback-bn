import { Router } from 'express';
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
  updateVerfiedUser,
} from '../../controllers/user.controller';
import {
  CheckEmailExists,
  checkIfTokenRevoked,
  checkIfUserIsVerified,
  isEmailExist,
  verifyAndRevokeToken,
  VerifyResetPasswordToken,
} from '../../middlewares/user.middlewares';
import validateRegister from '../../validations/user/register.validation';
import validateLogin from '../../validations/user/login.validation';
import validateEmail from '../../validations/user/resetEmail.validation';
import validateNewPassword from '../../validations/user/resetPassword.validation';

const router = Router();

router.post('/register', validateRegister, isEmailExist, registerUser);
router.post('/login', validateLogin, checkIfUserIsVerified, loginUser);
router.get(
  '/verify-email/:token',
  checkIfTokenRevoked,
  verifyAndRevokeToken,
  updateVerfiedUser,
);
router.post(
  '/forgot-password',
  validateEmail,
  CheckEmailExists,
  forgotPassword,
);
router.patch(
  '/reset-password/:token',
  validateNewPassword,
  VerifyResetPasswordToken,
  resetPassword,
);

export default router;
