/* global process */

const SYSTEM_PROMPT = 'You are a professional career coach and resume expert. Provide concise, actionable responses.';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured on the server.' });
  }

  const { prompt, maxTokens = 1000 } = req.body || {};

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'A valid prompt is required.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: maxTokens,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || 'OpenAI request failed.',
      });
    }

    return res.status(200).json({
      content: data?.choices?.[0]?.message?.content || '',
    });
  } catch (error) {
    return res.status(500).json({
      error: error?.message || 'Unexpected server error.',
    });
  }
}
