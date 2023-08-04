import { beforeEach, describe, expect, it, test } from '@jest/globals';
import dotenv from 'dotenv';
import request from 'supertest';
import app from '../../src/app';
import connectDB from '../../src/services/connectDb';
import { updateUser } from '../../src/services/user.service';
import {
  invalidLoginEmail,
  invalidLoginPassword,
  invalidRequest,
  successLogin,
  successRegister,
} from '../mocks/user.mocks';

dotenv.config();

beforeEach(async () => {
  await connectDB();
});

let user = '';

describe('Test registration user', () => {
  test('Successful Registration', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send(successRegister);
    expect(response.statusCode).toBe(201);

    user = response.body.user;
  });
  test('Email is already exist', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send(successRegister);
    expect(response.statusCode).toBe(409);
  });
  test('Invalid request', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send(invalidRequest);
    expect(response.statusCode).toBe(400);
  });

  describe('Test user login', () => {
    it('should not login when user is not verfied', async () => {
      const response = await request(app)
        .post('/api/v1/users/login')
        .send(successLogin);
      expect(response.statusCode).toBe(403);
    });
    it('should login when user is verfied', async () => {
      const verifyUser = await updateUser({ isEmailVerified: true }, user.id);
      const response = await request(app)
        .post('/api/v1/users/login')
        .send(successLogin);
      expect(response.statusCode).toBe(200);
    });
    it('should  not login for invalid email', async () => {
      const response = await request(app)
        .post('/api/v1/users/login')
        .send(invalidLoginEmail);
      expect(response.statusCode).toBe(400);
    });
    it('should  not login for password', async () => {
      const response = await request(app)
        .post('/api/v1/users/login')
        .send(invalidLoginPassword);
      expect(response.statusCode).toBe(400);
    });
  });
});
