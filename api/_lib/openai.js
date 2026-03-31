const SYSTEM_PROMPT = 'You are a professional career coach and resume expert. Provide concise, actionable responses.';

export const OPENAI_MODEL = 'gpt-4o-mini';

export function getApiKey() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured on the server.');
  }
  return apiKey;
}

export function clampMaxTokens(value, { fallback = 800, min = 64, max = 1200 } = {}) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.floor(parsed)));
}

export async function chatCompletion({ messages, maxTokens = 800, responseFormat = null }) {
  const apiKey = getApiKey();

  const payload = {
    model: OPENAI_MODEL,
    max_tokens: maxTokens,
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
  };

  if (responseFormat) {
    payload.response_format = responseFormat;
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw Object.assign(new Error(data?.error?.message || 'OpenAI request failed.'), {
      statusCode: response.status,
    });
  }

  return data?.choices?.[0]?.message?.content || '';
}

export function safeJsonParse(text, fallback = {}) {
  if (!text || typeof text !== 'string') return fallback;
  try {
    return JSON.parse(text);
  } catch {
    const cleaned = text
      .replace(/```json\n?/gi, '')
      .replace(/```\n?/g, '')
      .trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      return fallback;
    }
  }
}
