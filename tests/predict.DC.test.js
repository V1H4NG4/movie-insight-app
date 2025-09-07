const ML = process.env.ML_API_URL || 'http://127.0.0.1:8000';

describe('POST /predictDC', () => {
  it('returns a numeric prediction', async () => {
    const payload = { Budget: 150, Runtime: 130, Rating: 80 }; // Budget in millions, rating percent
    const res = await fetch(`${ML}/predictDC`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty('predicted_box_office');
    expect(typeof data.predicted_box_office).toBe('number');
  });
});