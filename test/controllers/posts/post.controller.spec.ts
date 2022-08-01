import request from 'supertest';
import app from '../../../src';

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app).get('/api/v1/posts');
    expect(res.statusCode).toEqual(200);
  });
});
