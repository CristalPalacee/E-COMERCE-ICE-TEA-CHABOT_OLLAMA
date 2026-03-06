



const API_URL = process.env.NEXT_PUBLIC_API_URL;


export interface ChatRequest {
  session_id: string;
  message: string;
  model?: string; // Samakan dengan schema backend
}

// Interface tambahan untuk handling error di UI
export interface ApiError {
  error: string;
}
export async function Message(
  payload: ChatRequest
){
  
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { error: `Server error: ${response.statusText}` };
    }

  return response.body;


  
}


export async function resetChat(sessionId: string) {

  const res = await fetch(`${API_URL}/chat/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        session_id : sessionId
    })
  })

  return res.json()
}


