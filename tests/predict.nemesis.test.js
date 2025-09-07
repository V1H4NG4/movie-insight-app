const ML = process.env.ML_API_URL || 'http://127.0.0.1:8000';

describe('POST /predictNemesis', () => {
  it('returns a numeric prediction when model is loaded (or 503 if not)', async () => {
    const infoRes = await fetch(`${ML}/model-info`);
    expect(infoRes.status).toBe(200);
    const info = await infoRes.json();
    const loaded = !!info?.nemesis_model?.loaded;

    const payload = {
      budget: 150,      // millions
      runtime: 130,
      rating: 78,       // percent
      popularity: 42.5,
      genre_1: 'Action',
      genre_2: 'Adventure'  // optional
    };

    const res = await fetch(`${ML}/predictNemesis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (loaded) {
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toHaveProperty('predicted_box_office');
      expect(typeof data.predicted_box_office).toBe('number');
    } else {
      // Fast fail when model file isn't present
      expect(res.status).toBe(503);
    }
  });
});