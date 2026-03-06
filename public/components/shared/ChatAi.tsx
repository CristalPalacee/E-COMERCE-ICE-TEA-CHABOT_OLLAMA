"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@/hooks/chat"

export default function ChatWidget() {

  const { messages, loading, send, reset } = useChat()

  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")

  const scrollRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  function handleSend() {
    if (!input.trim() || loading) return // Jangan kirim jika sedang loading
    send(input)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-8 lg:right-40 z-9999 w-14 h-14 rounded-full bg-blue-600 text-white text-xl shadow-lg hover:bg-blue-700 flex items-center justify-center"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-5 right-3 lg:right-40 w-80 h-[480px] z-9999 bg-white border border-gray-200 rounded-xl shadow-xl flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50 rounded-t-xl">

            <span className="font-semibold">
              AI Assistant
            </span>

            <div className="flex gap-2">

              <button
                onClick={reset}
                className="text-gray-500 hover:text-black"
              >
                ↺
              </button>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>

            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">

            {messages.length === 0 && <p className="text-xs text-gray-400">Belum ada percakapan. Silakan tanya sesuatu!</p>}{messages.map((msg, i) => (

              <div
                key={i}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>

              </div>

            ))}

          {loading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-3 py-2 rounded-2xl rounded-tl-none shadow-sm">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Input */}
          <div className="border-t p-2 flex gap-2">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder={loading ? "AI sedang berpikir..." : "Ketik pesan..."}
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />

            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              Send
            </button>

          </div>

        </div>
      )}
    </>
  )
}