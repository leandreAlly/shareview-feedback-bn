import { beforeEach, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';
import connectDB from '../../src/services/connectDb';
import {
  newToken,
  resetEmail,
  successResetRegister,
  resetPassword,
} from '../mocks/user.mocks';

beforeEach(async () => {
  await connectDB();
});

let resetToken = newToken;

describe('Test password Reset', () => {
  test('Sucessfull registration', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send(successResetRegister);

    expect(response.statusCode).toBe(201);
  });

  test('send email to get token', async () => {
    const response = await request(app)
      .post('/api/v1/users/forgot-password')
      .send(resetEmail);

    expect(response.statusCode).toBe(200);
  });
  test('Invalid email', async () => {
    const response = await request(app)
      .post('/api/v1/users/forgot-password')
      .send();
    expect(response.statusCode).toBe(400);
  });
});
