import request from 'supertest';
import dotenv from 'dotenv';
import app from '../../src/app';
import { successRegister, invalidRequest } from '../mocks/user.mocks';
import {
  afterEach,
  describe,
  test,
  jest,
  beforeEach,
  expect,
} from '@jest/globals';

dotenv.config();

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
