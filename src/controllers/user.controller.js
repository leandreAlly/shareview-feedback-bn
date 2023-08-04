import passport from 'passport';
import sendEmail from '../services/sendEmail.service';
import { register, updateUser } from '../services/user.service';
import { hashPassword } from '../utils/bcrypt.util';
import { generateToken } from '../utils/jwt.util';
import { verifyEmailTemplate } from '../utils/mailTemplate.util';

export const registerUser = async (req, res) => {
  try {
    const user = {
      ...req.body,
      usesPassword: true,
      lastTimePasswordUpdated: new Date(),
    };
    user.password = await hashPassword(req.body.password);
    const { id, email, role, lastTimePasswordUpdated } = await register(user);
    const userData = { id, email, role, lastTimePasswordUpdated };
    const userToken = generateToken(userData);

    const verificationEmail = verifyEmailTemplate(userToken);

    sendEmail(email, 'ShareView email verification', verificationEmail);

    return res.status(201).json({
      message: 'Check your email to verify your account',
      user: userData,
      token: userToken,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to register a new user',
    });
  }
};

export const loginUser = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    try {
      if (err || !user)
        return res.status(401).json({ message: 'Invalid email or password' });

      req.login(user, { session: false }, async (error) => {
        if (error)
          return res
            .status(401)
            .json({ message: 'Invalid email or password.' });
      });

      const { id, email, role, lastTimePasswordUpdated } = req.user;
      const userData = { id, email, role, lastTimePasswordUpdated };
      const userToken = generateToken(userData);

      return res.status(200).json({
        token: userToken,
        message: 'Login successful',
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: 'An error occurred while logging in.',
      });
    }
  })(req, res, next);
};

export const updateVerfiedUser = async (req, res) => {
  try {
    const { id } = req.user;
    await updateUser({ isEmailVerified: true }, id);

    return res.status(200).json({
      message: 'Your account has verified successfully!',
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to confirm user verification',
    });
  }
};
