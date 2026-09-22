"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { site } from "@/lib/site";

interface Message {
  from: "user" | "bot";
  text: string;
}

const GREETING = "Hey! 👋 We're here to help you find the right bag. What's your project?";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: GREETING }]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      { from: "user", text },
      { from: "bot", text: `Thanks! We'll get back to you shortly — or email us at ${site.email}.` },
    ]);
    setInput("");
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-50 flex w-[340px] flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={{ border: "3px solid #364FA0", maxHeight: "480px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-blue px-4 py-3">
            <div className="flex items-center gap-2">
              <Image
                src="/svg/icons/Alongway_Website_Graphic_SmileyFaace_Blue.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 invert brightness-200"
                aria-hidden="true"
              />
              <div>
                <p className="font-display text-xs font-bold text-white">Alongway</p>
                <p className="text-[10px] text-white/60">Usually replies in minutes</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white text-lg leading-none"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-white px-4 py-4 space-y-3" style={{ minHeight: "260px", maxHeight: "320px" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-5 ${
                    msg.from === "user"
                      ? "bg-blue text-white rounded-br-sm"
                      : "bg-bone text-charcoal rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-charcoal/10 bg-white px-3 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message…"
              className="flex-1 rounded-full border border-charcoal/15 bg-bone px-4 py-2 text-sm text-charcoal outline-none focus:border-blue"
            />
            <button
              onClick={send}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue hover:bg-charcoal transition-colors"
              aria-label="Send"
            >
              <Image
                src="/svg/icons/Alongway_Website_Graphic_ArrowRight_Cream.svg"
                alt=""
                width={115}
                height={79}
                className="h-3.5 w-auto"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-light-blue shadow-lg ring-2 ring-transparent hover:bg-blue hover:ring-white transition-all"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <span className="text-xl text-white leading-none">✕</span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
          </svg>
        )}
      </button>
    </>
  );
}
