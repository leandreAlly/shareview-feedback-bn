import passport from 'passport';
import passportLocal from 'passport-local';
import { getUserByEmail } from '../services/user.service';
import { comparePassword } from '../utils/bcrypt.util';

const authenticateUser = async (email, password, done) => {
  try {
    const userFound = await getUserByEmail(email);
    if (!userFound) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    const isPasswordValid = await comparePassword(password, userFound.password);
    if (!isPasswordValid) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    return done(null, userFound, { message: 'Authentication successful.' });
  } catch (error) {
    return done(error);
  }
};

passport.use(
  new passportLocal.Strategy(
    {
      usernameField: 'email',
    },
    authenticateUser,
  ),
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
