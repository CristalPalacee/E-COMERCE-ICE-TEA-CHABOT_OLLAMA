
from fastapi import FastAPI
from app.api.v1.api import api_router
from config.seeting import get_settings
from fastapi.middleware.cors import CORSMiddleware

settings = get_settings()


app = FastAPI(title=settings.APP_NAME)


app.add_middleware(
 CORSMiddleware,
    allow_origins=[settings.ALLOWED_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")