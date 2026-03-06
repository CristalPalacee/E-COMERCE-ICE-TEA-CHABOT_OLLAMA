from fastapi import APIRouter
from app.api.v1.endpoint.endpoint import router


api_router = APIRouter()

# Chatbot API
api_router.include_router(
    router,
    prefix="/chat",
    tags=["Chatbot"]
)

#