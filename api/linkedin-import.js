import { chatCompletion, clampMaxTokens, safeJsonParse } from './_lib/openai.js';
import { enforceRateLimit } from './_lib/security.js';

function normalizeList(input, maxItems = 12) {
  if (!Array.isArray(input)) return [];
  return input
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean)
    .slice(0, maxItems);
}

function normalizeResumeDraft(raw, linkedinUrl) {
  const personalInfo = {
    fullName: raw?.personalInfo?.fullName?.trim?.() || '',
    email: raw?.personalInfo?.email?.trim?.() || '',
    phone: raw?.personalInfo?.phone?.trim?.() || '',
    linkedin: raw?.personalInfo?.linkedin?.trim?.() || linkedinUrl || '',
    github: raw?.personalInfo?.github?.trim?.() || '',
    location: raw?.personalInfo?.location?.trim?.() || '',
    portfolio: raw?.personalInfo?.portfolio?.trim?.() || '',
  };

  const experience = Array.isArray(raw?.experience)
    ? raw.experience.slice(0, 8).map((exp) => ({
        company: exp?.company?.trim?.() || '',
        role: exp?.role?.trim?.() || '',
        location: exp?.location?.trim?.() || '',
        startDate: exp?.startDate?.trim?.() || '',
        endDate: exp?.endDate?.trim?.() || '',
        current: Boolean(exp?.current),
        bullets: normalizeList(exp?.bullets, 6),
      }))
    : [];

  const education = Array.isArray(raw?.education)
    ? raw.education.slice(0, 6).map((edu) => ({
        degree: edu?.degree?.trim?.() || '',
        institution: edu?.institution?.trim?.() || '',
        year: edu?.year?.trim?.() || '',
        gpa: edu?.gpa?.trim?.() || '',
      }))
    : [];

  const projects = Array.isArray(raw?.projects)
    ? raw.projects.slice(0, 6).map((proj) => ({
        title: proj?.title?.trim?.() || '',
        description: proj?.description?.trim?.() || '',
        techStack: proj?.techStack?.trim?.() || '',
        liveLink: proj?.liveLink?.trim?.() || '',
        githubLink: proj?.githubLink?.trim?.() || '',
      }))
    : [];

  const certifications = Array.isArray(raw?.certifications)
    ? raw.certifications.slice(0, 8).map((cert) => ({
        name: cert?.name?.trim?.() || '',
        issuer: cert?.issuer?.trim?.() || '',
        year: cert?.year?.trim?.() || '',
      }))
    : [];

  return {
    personalInfo,
    summary: raw?.summary?.trim?.() || '',
    experience,
    education,
    skills: normalizeList(raw?.skills, 24),
    projects,
    certifications,
  };
}

function buildImportPrompt({ linkedinUrl, profileText }) {
  return [
    'Create a polished resume draft from the input profile data.',
    'Return ONLY valid JSON with this exact shape:',
    '{',
    '  "personalInfo": {"fullName":"", "email":"", "phone":"", "linkedin":"", "github":"", "location":"", "portfolio":""},',
    '  "summary": "",',
    '  "experience": [{"company":"", "role":"", "location":"", "startDate":"YYYY-MM", "endDate":"YYYY-MM", "current": false, "bullets": [""]}],',
    '  "education": [{"degree":"", "institution":"", "year":"", "gpa":""}],',
    '  "skills": [""],',
    '  "projects": [{"title":"", "description":"", "techStack":"", "liveLink":"", "githubLink":""}],',
    '  "certifications": [{"name":"", "issuer":"", "year":""}]',
    '}',
    'Rules:',
    '- Do not invent contact details.',
    '- If date is unknown, use empty string.',
    '- Keep bullets short and impact-focused.',
    '- Use LinkedIn URL only as a label; do not claim you fetched remote content.',
    '',
    `LinkedIn URL: ${linkedinUrl || 'Not provided'}`,
    'Profile text:',
    profileText,
  ].join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rate = enforceRateLimit(req);
  if (rate.blocked) {
    res.setHeader('Retry-After', String(rate.retryAfterSec));
    return res.status(429).json({ error: rate.message });
  }

  const { linkedinUrl = '', profileText = '' } = req.body || {};
  if (!linkedinUrl.trim() && !profileText.trim()) {
    return res.status(400).json({
      error: 'Provide a LinkedIn URL or pasted profile text to generate a draft.',
    });
  }

  if (profileText.length > 12000) {
    return res.status(400).json({ error: 'Profile text is too long. Keep it below 12000 characters.' });
  }

  try {
    const prompt = buildImportPrompt({ linkedinUrl: linkedinUrl.trim(), profileText: profileText.trim() });
    const content = await chatCompletion({
      maxTokens: clampMaxTokens(1200, { fallback: 1000, min: 300, max: 1500 }),
      responseFormat: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }],
    });

    const parsed = safeJsonParse(content, {});
    const draft = normalizeResumeDraft(parsed, linkedinUrl.trim());
    return res.status(200).json({ draft });
  } catch (error) {
    return res.status(500).json({
      error: error?.message || 'Failed to generate imported resume draft.',
    });
  }
}
