import { describe } from '@jest/globals';
import { registerUser } from '../../src/controllers/user.controller';
import { register } from '../../src/services/user.service';

jest.mock('../../src/services/user.service');

describe('Test error', () => {
  it('should return an error message when the server is down', async () => {
    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const error = new Error('Server is down');
    register.mockRejectedValue(error);

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Server is down',
      message: 'Failed to register a new user',
    });
  });
});
