import { chatCompletion, clampMaxTokens } from './_lib/openai.js';
import { enforceRateLimit, validatePrompt } from './_lib/security.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rate = enforceRateLimit(req);
  if (rate.blocked) {
    res.setHeader('Retry-After', String(rate.retryAfterSec));
    return res.status(429).json({ error: rate.message });
  }

  const { prompt, maxTokens = 1000 } = req.body || {};
  const validation = validatePrompt(prompt, 6000);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const normalizedTokens = clampMaxTokens(maxTokens, { fallback: 800, min: 64, max: 1200 });

  try {
    const content = await chatCompletion({
      maxTokens: normalizedTokens,
      messages: [{ role: 'user', content: validation.normalized }],
    });

    return res.status(200).json({
      content,
    });
  } catch (error) {
    const statusCode = Number(error?.statusCode) || 500;
    return res.status(500).json({
      error: statusCode >= 500 ? (error?.message || 'Unexpected server error.') : 'AI request failed.',
    });
  }
}
