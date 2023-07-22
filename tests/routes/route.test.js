import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';

describe('/', () => {
  test('check welcome message', async () => {
    const response = await request(app).get('/api/v1/');
    expect(response.statusCode).toBe(200);
  });
  test('check welcome message', async () => {
    const response = await request(app).get('/api/v2/users/produ');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty(
      'error',
      'Path does not found, try again',
    );
  });
});
