const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 20;

function getBucketStore() {
  if (!globalThis.__CAREERCRAFT_RATE_LIMIT__) {
    globalThis.__CAREERCRAFT_RATE_LIMIT__ = new Map();
  }
  return globalThis.__CAREERCRAFT_RATE_LIMIT__;
}

export function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.trim()) {
    return xff.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

export function enforceRateLimit(req) {
  const store = getBucketStore();
  const ip = getClientIp(req);
  const now = Date.now();

  const record = store.get(ip) || { count: 0, resetAt: now + WINDOW_MS };
  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + WINDOW_MS;
  }

  record.count += 1;
  store.set(ip, record);

  if (record.count > LIMIT) {
    const retryAfterSec = Math.ceil((record.resetAt - now) / 1000);
    return {
      blocked: true,
      retryAfterSec,
      message: `Too many AI requests. Try again in ${retryAfterSec}s.`,
    };
  }

  return {
    blocked: false,
    remaining: LIMIT - record.count,
    resetAt: record.resetAt,
  };
}

export function validatePrompt(prompt, maxChars = 6000) {
  if (typeof prompt !== 'string' || !prompt.trim()) {
    return { valid: false, error: 'A valid prompt is required.' };
  }
  if (prompt.length > maxChars) {
    return {
      valid: false,
      error: `Prompt exceeds ${maxChars} characters. Please shorten your input.`,
    };
  }
  return { valid: true, normalized: prompt.trim() };
}
