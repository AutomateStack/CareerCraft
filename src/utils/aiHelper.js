async function callOpenAI(prompt, maxTokens = 1000) {
  try {
    const isProd = import.meta.env.PROD;
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    // In production, requests go through the serverless function so API keys stay private.
    if (isProd) {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, maxTokens }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.content?.trim() || '';
    }

    if (!apiKey) {
      throw new Error('OpenAI API key not configured for local development. Add VITE_OPENAI_API_KEY to your .env file.');
    }

    const response = await fetch('/api/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: maxTokens,
        messages: [
          {
            role: 'system',
            content: 'You are a professional career coach and resume expert. Provide concise, actionable responses.',
          },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    if (error.message.includes('API key')) throw error;
    throw new Error(`AI request failed: ${error.message}`);
  }
}

function parseJsonResponse(result, fallback) {
  try {
    const cleaned = result.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return fallback;
  }
}

export async function enhanceBullet(bulletText) {
  if (!bulletText.trim()) return bulletText;

  const prompt = `Enhance this resume bullet point to be more impactful. Use a strong action verb at the start, include quantifiable results where possible, and keep it concise (1-2 lines max). Return ONLY the enhanced bullet point, nothing else.

Original: "${bulletText}"`;

  return await callOpenAI(prompt, 200);
}

export async function generateSummary(resumeData) {
  const { personalInfo, experience, skills } = resumeData;
  
  const expSummary = experience
    .slice(0, 3)
    .map(e => `${e.role} at ${e.company}`)
    .join(', ');

  const skillList = skills.slice(0, 10).join(', ');

  const prompt = `Write a 3-sentence professional summary for a resume. The person is ${personalInfo.fullName || 'a professional'}.
${expSummary ? `Experience includes: ${expSummary}.` : ''}
${skillList ? `Key skills: ${skillList}.` : ''}

Write in first person implied (no "I"), professional tone. Return ONLY the summary paragraph, no quotes or labels.`;

  return await callOpenAI(prompt, 300);
}

export async function checkATS(resumeData, jobDescription) {
  const { experience, skills, summary } = resumeData;

  const resumeText = [
    summary,
    ...skills,
    ...experience.map(e => `${e.role} ${e.company} ${(e.bullets || []).join(' ')}`),
  ].join(' ');

  const prompt = `You are an ATS (Applicant Tracking System) analyzer. Compare this resume content against the job description.

RESUME CONTENT:
${resumeText.substring(0, 2000)}

JOB DESCRIPTION:
${jobDescription.substring(0, 2000)}

Return a JSON object with this exact format (no markdown, no code blocks, just raw JSON):
{
  "score": <number 0-100>,
  "missingKeywords": ["keyword1", "keyword2", ...],
  "presentKeywords": ["keyword1", "keyword2", ...],
  "suggestions": ["suggestion1", "suggestion2", ...]
}`;

  const result = await callOpenAI(prompt, 800);

  const parsed = parseJsonResponse(result, null);
  if (!parsed) {
    return {
      score: 0,
      missingKeywords: [],
      presentKeywords: [],
      suggestions: ['Could not parse AI response. Please try again.'],
    };
  }

  return parsed;
}

export function isAIConfigured() {
  // Production uses server-side key management in Vercel.
  return import.meta.env.PROD || !!import.meta.env.VITE_OPENAI_API_KEY;
}
