"use client";

export type MessageRole = "user" | "bot";

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  leadCaptured?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className="message-enter"
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: "10px",
        marginBottom: "16px",
      }}
    >
      {/* Avatar */}
      {!isUser && (
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "6px",
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "12px",
            letterSpacing: "0.05em",
            color: "var(--blue-mid)",
          }}
        >
          WC
        </div>
      )}

      {/* Bubble */}
      <div
        style={{
          maxWidth: "82%",
          padding: "12px 16px",
          borderRadius: isUser ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
          background: isUser
            ? "var(--blue-mid)"
            : "rgba(63, 91, 123, 0.06)",
          border: isUser
            ? "none"
            : "1px solid var(--border)",
          borderLeft: isUser
            ? "none"
            : "3px solid var(--blue-mid)",
          color: isUser ? "#fff" : "var(--text)",
          fontSize: "15px",
          lineHeight: 1.65,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {message.text}

        {/* Lead captured badge */}
        {message.leadCaptured && (
          <div
            style={{
              marginTop: "12px",
              padding: "8px 12px",
              background: "rgba(34, 197, 94, 0.08)",
              border: "1px solid rgba(34, 197, 94, 0.2)",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#16a34a",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "#16a34a",
                letterSpacing: "0.08em",
              }}
            >
              ILMOITTAUTUMINEN VASTAANOTETTU
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div
      className="message-enter"
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "10px",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "6px",
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "12px",
          color: "var(--blue-mid)",
        }}
      >
        WC
      </div>
      <div
        style={{
          padding: "14px 18px",
          borderRadius: "12px 12px 12px 4px",
          background: "rgba(63, 91, 123, 0.06)",
          border: "1px solid var(--border)",
          borderLeft: "3px solid var(--blue-mid)",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "var(--blue-mid)",
              animation: `typing-dot 1.2s ${i * 0.15}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
