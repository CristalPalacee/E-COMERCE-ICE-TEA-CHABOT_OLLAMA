from fastapi import APIRouter
from shema.schemas import ChatRequest, ChatResponse
from services.chat_AI import stream_chat
from services.chat_memory import get_history, add_message, reset_session
from fastapi.responses import StreamingResponse

router = APIRouter()


@router.post("")
def chat(data: ChatRequest):

    history = get_history(data.session_id)

    add_message(data.session_id, "user", data.message)  

    history = get_history(data.session_id)

    def stream_and_save():
        full_response = ""
        # chat_with_ollama sekarang mengembalikan generator
        for chunk in stream_chat(history, data.model):
            full_response += chunk
            yield chunk
        
        # Simpan ke memori setelah stream selesai
        add_message(data.session_id, "assistant", full_response)

    return StreamingResponse(stream_and_save(), media_type="text/plain")


@router.post("/reset")
def reset_chat(session_id: str):

    reset_session(session_id)

    return {"status": "session reset"}