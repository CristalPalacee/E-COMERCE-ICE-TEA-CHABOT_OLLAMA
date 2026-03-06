// hooks/chat.ts
"use client"

import { useState } from "react"
import { Message, resetChat } from "@/api/ai"

// Definisikan tipe pesan agar konsisten
type MessageType = {
  role: "user" | "assistant"
  content: string
}

export function useChat() {
  // Inisialisasi Session ID sekali saja saat hook pertama kali dimuat
  const [sessionId] = useState(() => crypto.randomUUID())
  const [messages, setMessages] = useState<MessageType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function send(input: string) {
    if (!input) return

    // 1. Tambahkan pesan user ke UI
    const userMessage: MessageType = {
      role: "user",
      content: input
    }
    setMessages(prev => [...prev, userMessage])
    
    setLoading(true)
    setError(null)

    try {
      // 2. Panggil fungsi Message dari api/ai
      // Pastikan api/ai mengembalikan response.body (ReadableStream)
      const stream = await Message({
        session_id: sessionId,
        message: input,
        model: "llama3.2:latest" // Menggunakan key 'model' sesuai schemas.py backend
      })

      // Validasi jika terjadi error pada fetch awal
      if (!stream || "error" in stream) {
        throw new Error(stream?.error || "Gagal mendapatkan respon dari server")
      }

      // 3. Siapkan bubble chat kosong untuk Assistant
      setMessages(prev => [...prev, { role: "assistant", content: "" }])

      // 4. Proses pembacaan Stream
      const reader = (stream as ReadableStream).getReader()
      const decoder = new TextDecoder()
      let accumulatedContent = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // Dekode potongan byte menjadi teks
        const chunk = decoder.decode(value, { stream: true })
        accumulatedContent += chunk

        // 5. Update pesan assistant terakhir secara real-time
        setMessages(prev => {
          const newMessages = [...prev]
          const lastIndex = newMessages.length - 1
          if (newMessages[lastIndex].role === "assistant") {
            newMessages[lastIndex] = { 
              ...newMessages[lastIndex], 
              content: accumulatedContent 
            }
          }
          return newMessages
        })
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan koneksi"
      setError(errorMessage)
      console.error("Chat Error:", err)
    } finally {
      setLoading(false)
    }
  }

  async function reset() {
    try {
      setLoading(true)
      // Reset session di sisi backend
      await resetChat(sessionId)
      setMessages([])
      setError(null)
    } catch (err) {
      setError("Gagal meriset percakapan")
    } finally {
      setLoading(false)
    }
  }

  return {
    messages,
    loading,
    error,
    send,
    reset
  }
}