import { NextRequest, NextResponse } from 'next/server';
import { HOGWARTS_OWL_SYSTEM_PROMPT, generateFallbackResponse } from '@/lib/chatbot-knowledge';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequestBody {
  messages?: ChatMessage[];
  lang?: 'vi' | 'en';
}

export async function POST(req: NextRequest) {
  let lang: 'vi' | 'en' = 'vi';
  try {
    let body: ChatRequestBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON request payload' },
        { status: 400 }
      );
    }

    const messages = body.messages || [];
    lang = body.lang || 'vi';

    // Extract the latest user message
    const userMessages = messages.filter((m) => m.role === 'user');
    const latestUserMessage =
      userMessages.length > 0 ? userMessages[userMessages.length - 1].content.trim() : '';

    if (!latestUserMessage) {
      const emptyReply =
        lang === 'en'
          ? '🦉 *Hoo-hoo!* Please ask me anything about iSupport, iLEAD 2026, or Hogwarts houses!'
          : '🦉 *Hoo-hoo!* Bạn hãy gửi câu hỏi về iSupport, iLEAD 2026 hoặc các Nhà Hogwarts cho Cú nhé!';
      return NextResponse.json({ reply: emptyReply, source: 'fallback' });
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    const model = process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini';

    // If no valid OpenAI API key is configured, instantly use the intelligent fallback engine
    const isApiKeyConfigured =
      apiKey &&
      apiKey.length > 10 &&
      !apiKey.includes('your_openai_api_key') &&
      !apiKey.startsWith('sk-test-placeholder');

    if (!isApiKeyConfigured) {
      const fallbackReply = generateFallbackResponse(latestUserMessage, lang);
      return NextResponse.json({
        reply: fallbackReply,
        source: 'fallback',
        note: 'OpenAI API key not configured or demo mode. Using intelligent local knowledge base.',
      });
    }

    // Call OpenAI Chat Completions API with abort timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const systemPromptWithLang = `${HOGWARTS_OWL_SYSTEM_PROMPT}\n\n[CONTEXT: User interface is set to ${lang === 'en' ? 'English (EN)' : 'Vietnamese (VI)'}. Please reply primarily in ${lang === 'en' ? 'English' : 'Vietnamese'} unless the user explicitly asks in another language.]`;

      const openAiMessages = [
        { role: 'system', content: systemPromptWithLang },
        // Keep up to 6 recent messages for conversational context
        ...messages
          .filter((m) => (m.role === 'user' || m.role === 'assistant' || m.role === 'system') && m.content?.trim())
          .slice(-6)
          .map((m) => ({
            role: m.role,
            content: m.content.trim(),
          })),
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: openAiMessages,
          temperature: 0.7,
          max_tokens: 800,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[OpenAI API Warning] Status ${response.status}: ${errorText}. Falling back to local engine.`);
        const fallbackReply = generateFallbackResponse(latestUserMessage, lang);
        return NextResponse.json({
          reply: fallbackReply,
          source: 'fallback',
          reason: `OpenAI returned status ${response.status}`,
        });
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content?.trim();

      if (!reply) {
        const fallbackReply = generateFallbackResponse(latestUserMessage, lang);
        return NextResponse.json({
          reply: fallbackReply,
          source: 'fallback',
        });
      }

      return NextResponse.json({
        reply,
        source: 'openai',
        model,
      });
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);
      console.warn('[Chat Route Error] Network or timeout issue with OpenAI API. Falling back to local engine.', fetchError);
      const fallbackReply = generateFallbackResponse(latestUserMessage, lang);
      return NextResponse.json({
        reply: fallbackReply,
        source: 'fallback',
        reason: fetchError instanceof Error ? fetchError.message : 'Network error',
      });
    }
  } catch (err: unknown) {
    console.error('[Chat Route Fatal Error]', err);
    return NextResponse.json(
      {
        reply:
          lang === 'en'
            ? '🦉 *Hoo-hoo!* A magical disturbance interrupted my flight. Please try again in a moment!'
            : '🦉 *Hoo-hoo!* Có một luồng phép thuật bất thường làm gián đoạn đường bay của Cú. Xin vui lòng thử lại sau giây lát nhé!',
        source: 'fallback',
      },
      { status: 200 }
    );
  }
}
