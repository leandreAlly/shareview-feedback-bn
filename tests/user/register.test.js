import request from 'supertest';
import dotenv from 'dotenv';
import app from '../../src/app';
import { successRegister, invalidRequest } from '../mocks/user.mocks';
import connectDB from '../../src/services/connectDb';
import {
  afterEach,
  describe,
  test,
  jest,
  beforeEach,
  expect,
} from '@jest/globals';

dotenv.config();

beforeEach(async () => {
  await connectDB();
});

describe('Test registration user', () => {
  test('Successful Registration', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send(successRegister);
    expect(response.statusCode).toBe(201);
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
});
