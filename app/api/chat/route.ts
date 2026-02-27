import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { success: false, error: "Webhook not configured" },
      { status: 500 }
    );
  }

  const body = await req.json();
  const { message, sessionId } = body;

  if (!message || !sessionId) {
    return NextResponse.json(
      { success: false, error: "Missing message or sessionId" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, sessionId }),
    });

    if (!response.ok) {
      throw new Error(`N8N webhook returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to reach the chatbot. Please try again.",
      },
      { status: 502 }
    );
  }
}
