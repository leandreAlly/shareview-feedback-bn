import { updateVerfiedUser } from '../../src/controllers/user.controller';
import { updateUser } from '../../src/services/user.service';

jest.mock('../../src/services/user.service');

const createMockReqRes = () => {
  const req = {
    user: { id: 123 },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  return { req, res };
};

describe('updateVerfiedUser controller', () => {
  test('should update user and return success message for verified user', async () => {
    updateUser.mockResolvedValue([1]);

    const { req, res } = createMockReqRes();

    await updateVerfiedUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Your account has verified successfully!',
    });
  });

  test('should return error message if updateUser function fails', async () => {
    const errorMessage = 'Mocked updateUser error';
    updateUser.mockRejectedValue(new Error(errorMessage));

    const { req, res } = createMockReqRes();

    await updateVerfiedUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: errorMessage,
      message: 'Failed to confirm user verification',
    });
  });
});
