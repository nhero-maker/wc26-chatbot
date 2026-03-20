export interface ChatRequest {
  message: string;
  sessionId: string;
}

export interface ChatResponse {
  success: boolean;
  data: {
    response: string;
    leadCaptured: boolean;
  };
}

export async function sendChatMessage(
  message: string,
  sessionId: string
): Promise<ChatResponse> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId } satisfies ChatRequest),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const serverMsg = body?.error;
    if (res.status === 429) {
      throw new Error(serverMsg ?? "Liian monta viestiä. Odota hetki.");
    }
    throw new Error(serverMsg ?? "Assistentti ei vastaa juuri nyt. Yritä hetken kuluttua.");
  }

  return res.json();
}
