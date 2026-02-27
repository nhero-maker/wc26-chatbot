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
    throw new Error(`Chat request failed: ${res.status}`);
  }

  return res.json();
}
