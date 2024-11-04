from fastapi import APIRouter, HTTPException
from models.AmswerSumRequest import AnswerSumRequest
from .score import router as score_router

@score_router.post("/questions/sum/")
async def calculate_answers(request: AnswerSumRequest):
    # Extract parameters from the request
    answers = request.answers
    

    
    
    