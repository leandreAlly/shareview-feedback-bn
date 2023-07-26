import { registerUser } from '../../src/controllers/user.controller';

jest.mock('../../src/utils/bcrypt.util', () => ({
  hashPassword: jest.fn(() => {
    throw new Error('Password hashing failed');
  }),
}));

describe('registerUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a 500 status and error message when hashPassword function throws an error', async () => {
    const reqMock = {
      body: {
        firstname: 'leandre',
        lastname: 'ally',
        email: 'test1@mail.co',
        password: 'Password1',
      },
    };
    const resMock = {
      status: jest.fn(() => resMock),
      json: jest.fn(),
    };

    await registerUser(reqMock, resMock);

    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.json).toHaveBeenCalledWith({
      error: 'Password hashing failed',
      message: 'Failed to register a new user',
    });
  });
});
