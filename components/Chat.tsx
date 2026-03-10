"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ChatMessage, { TypingIndicator, type Message } from "./ChatMessage";
import { sendChatMessage } from "@/lib/n8n";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "bot",
  text: "Hei! Olen WC26 Winter Cup 2026 -turnauksen virallinen assistentti 👋\n\nVoin kertoa turnauksen formaatista, kentistä, pisteytyssäännöistä ja palkintokategorioista. Voin myös ottaa sinun ilmoittautumistietosi vastaan, jos olet kiinnostunut osallistumaan!\n\nMistä haluaisit tietää lisää?",
};

const SUGGESTIONS = [
  "Kerro turnausformaatista",
  "Mitä kenttiä pelataan?",
  "Haluan ilmoittautua",
  "Mitkä ovat palkintokategoriat?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("wc26-session");
    if (stored) {
      setSessionId(stored);
    } else {
      const id = crypto.randomUUID();
      sessionStorage.setItem("wc26-session", id);
      setSessionId(id);
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading || !sessionId) return;
      setError(null);

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        text: text.trim(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      try {
        const res = await sendChatMessage(text.trim(), sessionId);
        const botMsg: Message = {
          id: `b-${Date.now()}`,
          role: "bot",
          text: res.data.response,
          leadCaptured: res.data.leadCaptured,
        };
        setMessages((prev) => [...prev, botMsg]);
      } catch {
        setError("Yhteysvirhe. Tarkista verkkoyhteytesi ja yritä uudelleen.");
      } finally {
        setIsLoading(false);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    },
    [isLoading, sessionId]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div
      id="chat"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "700px",
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        position: "sticky",
        top: "24px",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Chat header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "var(--surface)",
          flexShrink: 0,
        }}
      >
        <img
          src="/wc26-logo.png"
          alt="WC26"
          style={{
            width: "38px",
            height: "38px",
            objectFit: "contain",
            borderRadius: "6px",
          }}
        />
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "15px",
              letterSpacing: "0.04em",
              color: "var(--text)",
            }}
          >
            WC26 ASSISTENTTI
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
            }}
          >
            WINTER CUP 2026
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "#16a34a",
            letterSpacing: "0.08em",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#16a34a",
            }}
          />
          ONLINE
        </div>
      </div>

      {/* Suggestion chips — only when 1 message */}
      {messages.length === 1 && (
        <div
          style={{
            padding: "12px 16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            borderBottom: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              style={{
                padding: "8px 14px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--blue-mid)";
                e.currentTarget.style.color = "var(--blue-mid)";
                e.currentTarget.style.background = "rgba(63,91,123,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.background = "var(--surface)";
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          background: "#fff",
        }}
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
          <div
            style={{
              padding: "10px 14px",
              background: "rgba(220,38,38,0.06)",
              border: "1px solid rgba(220,38,38,0.15)",
              borderRadius: "var(--radius)",
              fontSize: "13px",
              color: "var(--red-bright)",
              marginBottom: "12px",
            }}
          >
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "10px",
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "10px 14px",
            transition: "border-color 0.2s",
          }}
          onFocusCapture={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--blue-mid)";
          }}
          onBlurCapture={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Kirjoita kysymys..."
            disabled={isLoading}
            rows={1}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "none",
              color: "var(--text)",
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              lineHeight: 1.5,
              maxHeight: "120px",
              minHeight: "24px",
              overflowY: "auto",
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "6px",
              background: input.trim() && !isLoading ? "var(--blue-mid)" : "var(--surface-2)",
              border: "none",
              cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (input.trim() && !isLoading) {
                e.currentTarget.style.background = "var(--blue-bright)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                input.trim() && !isLoading ? "var(--blue-mid)" : "var(--surface-2)";
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              style={{
                opacity: input.trim() && !isLoading ? 1 : 0.3,
                color: input.trim() && !isLoading ? "#fff" : "var(--text-muted)",
              }}
            >
              <path
                d="M14 8L2 14l2.5-6L2 2l12 6z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div
          style={{
            marginTop: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--text-dim)",
            textAlign: "center",
            letterSpacing: "0.06em",
          }}
        >
          ENTER lähettää · SHIFT+ENTER rivinvaihto
        </div>
      </div>
    </div>
  );
}
