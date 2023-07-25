import { loginUser } from '../../src/controllers/user.controller';

jest.mock('passport', () => ({
  authenticate: jest.fn((strategyName, options, callback) => (req) => {
    if (strategyName === 'local' && req.body.email === 'invalid@example.com') {
      callback(new Error('Authentication failed'));
    } else {
      callback(null, {
        token: 'jdfkjdfjfjkdfp[fdpredmfdlkfdklfdklfdklfdlkfdkl',
        message: 'Login successful',
      });
    }
  }),
}));

jest.mock('../../src/services/user.service', () => ({
  getUserByEmail: jest.fn(() => {
    throw new Error('User not found');
  }),
}));

jest.mock('../../src/utils/bcrypt.util', () => ({
  comparePassword: jest.fn(() => {
    throw new Error('Password comparison failed');
  }),
}));

describe('loginUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a 401 status and error message for invalid email or password', async () => {
    const reqMock = {
      body: {
        email: 'invalid@example.com',
        password: 'invalidPassword',
      },
    };
    const resMock = {
      status: jest.fn(() => resMock),
      json: jest.fn(),
    };
    const nextMock = jest.fn();

    await loginUser(reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(401);
    expect(resMock.json).toHaveBeenCalledWith({
      message: 'Invalid email or password',
    });
  });

  it('should return a 401 status and error message if req.login returns an error', async () => {
    const reqMock = {
      body: {
        email: 'valid@example.com',
        password: 'validPassword',
      },
      login: jest.fn((user, options, callback) => {
        callback(new Error('Login failed'));
      }),
    };
    const resMock = {
      status: jest.fn(() => resMock),
      json: jest.fn(),
    };
    const nextMock = jest.fn();

    await loginUser(reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(401);
    expect(resMock.json).toHaveBeenCalledWith({
      message: 'Invalid email or password.',
    });
  });

  it('should return a 500 status and error message when getUserByEmail throws an error', async () => {
    const reqMock = {
      body: {
        email: 'valid@example.com',
        password: 'validPassword',
      },
    };
    const resMock = {
      status: jest.fn(() => resMock),
      json: jest.fn(),
    };
    const nextMock = jest.fn();
    await loginUser(reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.json).toHaveBeenCalledWith({
      error: 'req.login is not a function',
      message: 'An error occurred while logging in.',
    });
  });

  it('should return a 500 status and error message when comparePassword throws an error', async () => {
    const reqMock = {
      body: {
        email: 'valid@example.com',
        password: 'validPassword',
      },
    };
    const resMock = {
      status: jest.fn(() => resMock),
      json: jest.fn(),
    };
    const nextMock = jest.fn();

    await loginUser(reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.json).toHaveBeenCalledWith({
      error: 'req.login is not a function',
      message: 'An error occurred while logging in.',
    });
  });
});
