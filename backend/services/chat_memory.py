from config.seeting import get_settings

settings = get_settings()

# memory sederhana (in-memory)
chat_sessions = {}

SYSTEM_PROMPT = {
    "role": "system",
    "content": "Kamu adalah AI assistant yang selalu menjawab dalam Bahasa Indonesia."
}

def get_history(session_id: str):

    if session_id not in chat_sessions:
        chat_sessions[session_id] = [SYSTEM_PROMPT]

    return chat_sessions[session_id]


def add_message(session_id: str, role: str, content: str):

    history = get_history(session_id)

    history.append({
        "role": role,
        "content": content
    })

    # limit history
    if len(history) > settings.MAX_HISTORY:
        chat_sessions[session_id] = history[-settings.MAX_HISTORY:]


def reset_session(session_id: str):

    chat_sessions[session_id] = []