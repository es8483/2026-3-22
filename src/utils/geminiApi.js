const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const IMAGE_MODEL = 'gemini-3-pro-image-preview';
const TEXT_MODEL = 'gemini-2.0-flash';

/**
 * Generate an image using Gemini image model
 * @param {string} apiKey - Google Gemini API key
 * @param {string} prompt - Image generation prompt
 * @returns {Promise<string>} - Base64 image data URL
 */
export async function generateImage(apiKey, prompt) {
  const url = `${GEMINI_API_BASE}/models/${IMAGE_MODEL}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseModalities: ['IMAGE', 'TEXT'],
      }
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message || `API 오류: ${response.status}`);
  }

  const data = await response.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];

  for (const part of parts) {
    if (part.inlineData?.mimeType?.startsWith('image/')) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }

  throw new Error('이미지 데이터를 찾을 수 없습니다.');
}

/**
 * Generate counseling advice using Gemini text model
 * @param {string} apiKey - Google Gemini API key
 * @param {string} attachmentType - User's attachment type
 * @param {string} userMessage - User's message/question
 * @param {Array} conversationHistory - Previous conversation
 * @returns {Promise<string>} - Counseling response
 */
export async function generateCounselingResponse(apiKey, attachmentType, userMessage, conversationHistory = []) {
  const url = `${GEMINI_API_BASE}/models/${TEXT_MODEL}:generateContent?key=${apiKey}`;

  const attachmentContext = {
    secure: '안정형 애착',
    anxious: '불안형 애착',
    avoidant: '회피형 애착',
    disorganized: '혼란형 애착',
  };

  const systemInstruction = `당신은 애착이론에 기반한 전문 심리치료사 겸 연애상담사입니다.
사용자의 애착 유형은 "${attachmentContext[attachmentType]}"입니다.

다음 원칙에 따라 상담을 진행해주세요:
1. 따뜻하고 공감적인 언어를 사용하세요
2. 애착이론의 관점에서 사용자의 패턴을 이해하고 설명해주세요
3. 판단하지 않고 수용적인 태도를 유지하세요
4. 구체적이고 실용적인 조언을 제공하세요
5. 필요한 경우 전문적인 치료를 권유하세요
6. 답변은 친근하되 전문적이며, 200-400자 내외로 간결하게 작성하세요
7. 한국어로 대화하세요`;

  const messages = [
    ...conversationHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    })),
    {
      role: 'user',
      parts: [{ text: userMessage }]
    }
  ];

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: messages,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message || `API 오류: ${response.status}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '응답을 생성할 수 없습니다.';
}

/**
 * Validate API key by making a simple test request
 * @param {string} apiKey
 * @returns {Promise<boolean>}
 */
export async function validateApiKey(apiKey) {
  const url = `${GEMINI_API_BASE}/models/${TEXT_MODEL}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: '안녕' }] }],
      generationConfig: { maxOutputTokens: 10 }
    })
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const message = error?.error?.message || `API 오류 (${response.status})`;
    throw new Error(message);
  }
  return true;
}
