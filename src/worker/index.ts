import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage } from 'mimetext';

interface Env {
  SEND_EMAIL: {
    send(message: EmailMessage): Promise<void>;
  };
  CONTACT_EMAIL: string;
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

async function handleContact(request: Request, env: Env): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://oishikai.dev',
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json<{
      product?: string;
      name: string;
      email: string;
      category: string;
      message: string;
    }>();

    if (!body.name || !body.email || !body.message) {
      return new Response(
        JSON.stringify({ error: '必須項目が入力されていません。' }),
        { status: 400, headers: corsHeaders },
      );
    }

    const categoryLabels: Record<string, string> = {
      bug: '不具合報告',
      feature: '機能リクエスト',
      question: '質問',
      'app-dev': 'アプリ開発依頼',
      'web-dev': 'Web開発依頼',
      consulting: 'ご相談',
      other: 'その他',
    };
    const categoryLabel = categoryLabels[body.category] || body.category;
    const productLabel = body.product || 'お問い合わせ';
    const destination = env.CONTACT_EMAIL;

    const msg = createMimeMessage();
    msg.setSender({ name: 'oishikai.dev Contact', addr: 'noreply@oishikai.dev' });
    msg.setRecipient(destination);
    msg.setSubject(`[${productLabel}] [${categoryLabel}] ${body.name} さんからのお問い合わせ`);
    msg.addMessage({
      contentType: 'text/plain',
      data: [
        `プロダクト: ${productLabel}`,
        `名前: ${body.name}`,
        `メール: ${body.email}`,
        `カテゴリ: ${categoryLabel}`,
        '',
        '--- メッセージ ---',
        body.message,
      ].join('\n'),
    });

    const emailMessage = new EmailMessage(
      'noreply@oishikai.dev',
      destination,
      msg.asRaw(),
    );
    await env.SEND_EMAIL.send(emailMessage);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: corsHeaders },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: `送信に失敗しました: ${message}` }),
      { status: 500, headers: corsHeaders },
    );
  }
}
