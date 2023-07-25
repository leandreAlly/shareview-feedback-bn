import { describe, expect, it, jest } from '@jest/globals';
import passport from 'passport';
import authenticateUser from '../../src/config/passport.local.config';
import { getUserByEmail } from '../../src/services/user.service';
import { comparePassword } from '../../src/utils/bcrypt.util';

jest.mock('../../src/services/user.service');
jest.mock('../../src/utils/bcrypt.util');

describe('authenticateUser', () => {
  const email = 'test@example.com';
  const password = 'testPassword';
  const doneMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call done with error if getUserByEmail throws an error', async () => {
    getUserByEmail.mockRejectedValueOnce(new Error('Database error'));

    await authenticateUser(email, password, doneMock);

    expect(doneMock).toHaveBeenCalledWith(new Error('Database error'));
  });

  it('should call done with false if user is not found', async () => {
    getUserByEmail.mockResolvedValueOnce(null);

    await authenticateUser(email, password, doneMock);

    expect(doneMock).toHaveBeenCalledWith(null, false, {
      message: 'Incorrect email or password.',
    });
  });

  it('should call done with false if password is invalid', async () => {
    const userFound = { email, password: 'hashedPassword' };
    getUserByEmail.mockResolvedValueOnce(userFound);
    comparePassword.mockResolvedValueOnce(false);

    await authenticateUser(email, password, doneMock);

    expect(doneMock).toHaveBeenCalledWith(null, false, {
      message: 'Incorrect email or password.',
    });
  });

  it('should call done with user object if authentication is successful', async () => {
    const userFound = { email, password: 'hashedPassword' };
    getUserByEmail.mockResolvedValueOnce(userFound);
    comparePassword.mockResolvedValueOnce(true);

    await authenticateUser(email, password, doneMock);

    expect(doneMock).toHaveBeenCalledWith(null, userFound, {
      message: 'Authentication successful.',
    });
  });
});

describe('Passport Strategy', () => {
  it('should call the authenticate function with correct options', () => {
    const passportUseSpy = jest.spyOn(passport, 'use');

    passportUseSpy.mockImplementationOnce((strategyName, options, callback) => {
      expect(strategyName).toBe('local');
      expect(options).toEqual({ usernameField: 'email' });
      expect(callback).toBe(authenticateUser);
    });

    passportUseSpy.mockRestore();
  });
});
