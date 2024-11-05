from fastapi import APIRouter, HTTPException
from models.AmswerSumRequest import AnswerSumRequest
from services.check_questions_service import check_questions

router_questions = APIRouter()

@router_questions.post("/questions/sum/")
async def calculate_answers(request: AnswerSumRequest):
    # Extract parameters from the request
    answers = request.answers
    
    return check_questions(answers)

    
    
    