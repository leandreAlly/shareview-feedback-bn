import { checkIfUserIsVerified } from '../../src/middlewares/user.middlewares';
import { getUserByEmail } from '../../src/services/user.service';
import { verifyAndRevokeToken } from '../../src/middlewares/user.middlewares';
import { checkIfTokenRevoked } from '../../src/middlewares/user.middlewares';
import { BlackList } from '../../src/database/models';
import * as jwt from '../../src/utils/jwt.util';

jest.mock('../../src/services/user.service', () => ({
  getUserByEmail: jest.fn(),
}));

const app = require('../../src/app');

describe('verifyAndRevokeToken middleware', () => {
  test('should call next if token is valid', async () => {
    const req = {
      params: {
        token: 'valid-token',
      },
    };
    const res = {};
    const next = jest.fn();

    // Mock the response from the verifyToken function
    const decoded = {
      id: '6c4bc413-a0bf-43ab-95ea-831f359c4193',
      email: 'example@gmail.com',
      role: 'user',
      lastTimePasswordUpdated: '2023-08-04T12:05:21.286Z',
    };
    jest.spyOn(jwt, 'verifyToken').mockReturnValue(decoded);

    // Mock the BlackList.create function
    BlackList.create = jest.fn().mockResolvedValue({});

    await verifyAndRevokeToken(req, res, next);

    expect(jwt.verifyToken).toHaveBeenCalledWith('valid-token');
    expect(BlackList.create).toHaveBeenCalledWith({ token: 'valid-token' });
    expect(req.user).toEqual(decoded);
    expect(next).toHaveBeenCalled();
  });

  test('should return a 403 status if token is invalid', async () => {
    const req = {
      params: {
        token: 'invalid-token',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Mock the response from the verifyToken function
    jest.spyOn(jwt, 'verifyToken').mockReturnValue(null);

    await verifyAndRevokeToken(req, res, next);

    expect(jwt.verifyToken).toHaveBeenCalledWith('invalid-token');
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Failed to verify email',
    });
    expect(next).not.toHaveBeenCalled();
  });
});

describe('checkIfUserIsVerified middleware', () => {
  test('should call next if the user is verified', async () => {
    const req = {
      body: {
        email: 'verified@example.com',
      },
    };
    const res = {};
    const next = jest.fn();

    await getUserByEmail.mockResolvedValue({ isEmailVerified: true });

    await checkIfUserIsVerified(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('should return a 403 status if the user is not verified', async () => {
    const req = {
      body: {
        email: 'unverified@example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getUserByEmail.mockResolvedValue({ isEmailVerified: false });

    await checkIfUserIsVerified(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User email is not verified.',
    });
    expect(next).not.toHaveBeenCalled();
  });
});

describe('checkIfTokenRevoked middleware', () => {
  test('should call next if token is not revoked', async () => {
    const req = {
      params: {
        token: 'valid-token',
      },
    };
    const res = {};
    const next = jest.fn();

    BlackList.findOne = jest.fn().mockReturnValue(null);

    await checkIfTokenRevoked(req, res, next);

    expect(BlackList.findOne).toHaveBeenCalledWith({
      where: { token: 'valid-token' },
    });
    expect(next).toHaveBeenCalled();
  });

  test('should return a 403 status if token is revoked', async () => {
    const req = {
      params: {
        token: 'revoked-token',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    BlackList.findOne = jest.fn().mockReturnValue({});

    await checkIfTokenRevoked(req, res, next);

    expect(BlackList.findOne).toHaveBeenCalledWith({
      where: { token: 'revoked-token' },
    });
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error occurred while verifying your account',
    });
    expect(next).not.toHaveBeenCalled();
  });
});
