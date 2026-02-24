const request = require('supertest');
const app = require('../app');

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /feedback', () => {
  it('returns 200 with an array', async () => {
    const res = await request(app).get('/feedback');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /feedback', () => {
  it('creates a feedback entry and returns 201', async () => {
    const payload = { user: 'alice', comment: 'Great tutorial!' };
    const res = await request(app).post('/feedback').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(payload);
  });

  it('persists the entry so GET /feedback includes it', async () => {
    const res = await request(app).get('/feedback');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([{ user: 'alice', comment: 'Great tutorial!' }])
    );
  });
});
