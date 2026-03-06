from pydantic import BaseModel
from config.seeting import get_settings
from typing import Optional
settings = get_settings()

class ChatRequest(BaseModel):
    session_id: str
    message: str
    model: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    session_id: str