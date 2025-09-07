const ML = process.env.ML_API_URL || 'http://127.0.0.1:8000';

describe('ML /model-info', () => {
  it('returns DC + Nemesis model metadata', async () => {
    const res = await fetch(`${ML}/model-info`);
    expect(res.status).toBe(200);
    const data = await res.json();

    expect(data).toHaveProperty('dc_model');
    expect(data).toHaveProperty('nemesis_model');
    expect(typeof data.nemesis_model.loaded).toBe('boolean');  // may be true/false
    expect(data.dc_model).toMatchObject({ endpoint: '/predictDC' });
    expect(data.nemesis_model).toMatchObject({ endpoint: '/predictNemesis' });
  });
});