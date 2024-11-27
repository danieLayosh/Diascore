from fastapi import APIRouter
from app.services.omr import do_omr_two_pages

omr_router = APIRouter()