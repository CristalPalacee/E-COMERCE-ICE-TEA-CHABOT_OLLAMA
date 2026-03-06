from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache 

class Settings(BaseSettings):
    APP_PORT: int = 8000
    OLLAMA_MODEL: str = "llama-3b"
    APP_NAME: str = "AI Service"
    OLLAMA_URL: str = ""
    REQUEST_TIMEOUT: int = 120
    DB_NAME: str =""
    DB_USER: str =""
    DB_PASS: str =""
    DB_HOST: str =""
    DB_PORT: str =""
    # Menggantikan: int(os.getenv("DAILY_LIMIT", 3))
    # DAILY_LIMIT: int = 5
    ALLOWED_ORIGINS: str = "http://localhost:3000"
    MAX_HISTORY: int = 20

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding='utf-8',)

@lru_cache()
def get_settings():
    return Settings() 

# output otomatis saat start (Safety logic)